"use client";
// ─────────────────────────────────────────────────────────────────────────────
// use-toast  (original — inspired by react-hot-toast)
// +
// useProducts  (Google Sheets API v4 data fetching hook)
//
// Both hooks are exported from this single file.
//
// IMPORTS in your components:
//   import { useToast, toast }  from '@/hooks/use-toast';
//   import { useProducts }      from '@/hooks/use-toast';
// ─────────────────────────────────────────────────────────────────────────────

import * as React from "react"
import Papa from "papaparse";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — useToast  (unchanged from original)
// ═══════════════════════════════════════════════════════════════════════════════

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST:    "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST:"DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: "REMOVE_TOAST", toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => addToRemoveQueue(toast.id))
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) return { ...state, toasts: [] }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners = []
let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

function toast({ ...props }) {
  const id = genId()

  const update  = (props) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } })
  const dismiss = ()      => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => { if (!open) dismiss() },
    },
  })

  return { id, dismiss, update }
}

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — useProducts  (Google Sheets API v4)
//
// ── REQUIRED GOOGLE SHEET COLUMN ORDER ─────────────────────────────────────
// Column A │ product_id         │ URL-safe slug       e.g. "ethereal-peony"
// Column B │ product_name       │ Display name        e.g. "Ethereal Peony"
// Column C │ category           │ e.g. "Preserved" | "Crochet" | "Silk Artisanal" | "Dried Botanicals"
// Column D │ selling_price      │ Numeric only        e.g. "125.00"
// Column E │ short_description  │ One-line teaser shown on the shop card
// Column F │ full_description   │ Long paragraph shown on the detail page
// Column G │ features           │ Pipe-separated      e.g. "Feature 1|Feature 2|Feature 3"
// Column H │ care_instructions  │ Plain text care guide
// Column I │ image_1            │ Primary image URL (card + detail hero)
// Column J │ image_2            │ Second image URL (detail thumbnail)
// Column K │ image_3            │ Third image URL  (detail thumbnail)
// Column L │ image_4            │ Fourth image URL (detail thumbnail) — optional
// Column M │ image_5            │ Fifth image URL  — optional
// Column N │ stock_status       │ "in_stock" | "out_of_stock" | "pre_order"
// Column O │ badge              │ Optional label: "New" | "Bestseller" | (blank)
// Column P │ weight_grams       │ Numeric             e.g. "250"
// Column Q │ dimensions         │ e.g. "30cm x 20cm x 15cm"
// Column R │ made_in            │ Country/region      e.g. "India"
// Column S │ tags               │ Comma-separated     e.g. "rose,pink,romantic"
// ───────────────────────────────────────────────────────────────────────────
// Row 1 = header row. Data starts from Row 2.
//
// ── ENV VARIABLES (.env) ───────────────────────────────────────────────────
// VITE_GOOGLE_SHEETS_API_KEY=AIza...
// VITE_SPREADSHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
// VITE_SHEET_NAME=Products     ← name of the tab (default: Sheet1)
// ═══════════════════════════════════════════════════════════════════════════════

// const SHEETS_API_KEY    = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
// const SPREADSHEET_ID    = import.meta.env.VITE_SPREADSHEET_ID;
// const SHEET_NAME        = import.meta.env.VITE_SHEET_NAME || 'Sheet1';

// Column index map (0-based) — mirrors the header order above
const COL = {
  product_id:        0,
  product_name:      1,
  category:          2,
  selling_price:     3,
  short_description: 4,
  full_description:  5,
  features:          6,
  care_instructions: 7,
  image_1:           8,
  image_2:           9,
  image_3:           10,
  image_4:           11,
  image_5:           12,
  stock_status:      13,
  badge:             14,
  weight_grams:      15,
  dimensions:        16,
  made_in:           17,
  tags:              18,
};

/** Safely read a cell; returns '' if missing. */
function cell(row, colIndex) {
  return (row[colIndex] ?? '').toString().trim();
}

/** Convert a raw Sheets API row array → product object. */
function parseRow(row) {
  const images = [
    cell(row, COL.image_1),
    cell(row, COL.image_2),
    cell(row, COL.image_3),
    cell(row, COL.image_4),
    cell(row, COL.image_5),
  ].filter(Boolean);

  const features = cell(row, COL.features)
    .split('|')
    .map((f) => f.trim())
    .filter(Boolean);

  const tags = cell(row, COL.tags)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    id:               cell(row, COL.product_id),
    name:             cell(row, COL.product_name),
    category:         cell(row, COL.category),
    price:            cell(row, COL.selling_price),
    description:      cell(row, COL.short_description),
    fullDescription:  cell(row, COL.full_description),
    features,
    careInstructions: cell(row, COL.care_instructions),
    image:            images[0] || '',  // primary for card
    images,                              // all for detail carousel
    stockStatus:      cell(row, COL.stock_status) || 'in_stock',
    badge:            cell(row, COL.badge),
    weightGrams:      cell(row, COL.weight_grams),
    dimensions:       cell(row, COL.dimensions),
    madeIn:           cell(row, COL.made_in),
    tags,
  };
}

/**
 * useProducts()
 *
 * Returns { products, categories, loading, error, refetch }
 *
 * products   — parsed array of product objects from the sheet
 * categories — ['All Collections', ...unique categories from sheet]
 * loading    — true while fetching
 * error      — error message string or null
 * refetch    — call to manually re-fetch (e.g. after editing the sheet)
 */
export function useProducts() {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState(["All Collections"]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [tick, setTick] = React.useState(0);

  const refetch = () => setTick((t) => t + 1);

  React.useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        // ✅ CORRECT PUBLIC CSV URL (IMPORTANT)
        const csvUrl =
          "https://docs.google.com/spreadsheets/d/1NM6fXhbvSSupTqGjjZqZKTSLGMxaEd9Dly6QYKVlAZk/export?format=csv&gid=1827545222";

        const res = await fetch(csvUrl);

        if (!res.ok) {
          throw new Error("Failed to fetch Google Sheet");
        }

        const text = await res.text();

        // 🔥 SIMPLE CSV PARSER (handles quotes)
        const rows = text
          .split("\n")
          .map((row) =>
            row
              .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/) // ignore commas inside quotes
              .map((cell) => cell.replace(/^"|"$/g, "").trim())
          );

        const [headers, ...data] = rows;

        const parsed = data
          .filter((row) => row.length > 1)
          .map((row) => {
            const obj = {};

            headers.forEach((h, i) => {
              obj[h.trim()] = row[i] || "";
            });

            const images = [
              obj.image_1,
              obj.image_2,
              obj.image_3,
              obj.image_4,
              obj.image_5,
            ].filter(Boolean);

            return {
              id: obj.product_id?.trim(),
              name: obj.product_name?.trim(),
              category: obj.category?.trim(),
              price: parseFloat(obj.selling_price || 0),
              description: obj.short_description,
              fullDescription: obj.full_description,
              features: obj.features
                ? obj.features.split("|").map((f) => f.trim())
                : [],
              careInstructions: obj.care_instructions,
              image: images[0] || "",
              images,
              stockStatus: obj.stock_status || "in_stock",
              badge: obj.badge,
              weightGrams: parseInt(obj.weight_grams || 0),
              dimensions: obj.dimensions,
              madeIn: obj.made_in,
              tags: obj.tags
                ? obj.tags.split(",").map((t) => t.trim())
                : [],
            };
          })
          .filter((p) => p.id); // remove empty rows

        if (!cancelled) {
          setProducts(parsed);

          setCategories([
            "All Collections",
            ...new Set(parsed.map((p) => p.category).filter(Boolean)),
          ]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load products.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  return { products, categories, loading, error, refetch };
}