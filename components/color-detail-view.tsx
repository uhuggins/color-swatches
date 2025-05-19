"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Copy, Check } from "lucide-react"

interface ColorDetailProps {
  color: {
    name: string
    swatch_id: string
    coloro: string
    pantone_tcx: string | null
    hex: string
    rgb: number[]
  }
  isOpen: boolean
  onClose: () => void
}

export default function ColorDetailView({ color, isOpen, onClose }: ColorDetailProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!color) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md max-h-[90vh] overflow-y-auto"
        style={{
          background: "linear-gradient(to bottom, #ffffff, #f8f8f8)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: "12px",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ textShadow: "0 1px 0 rgba(255,255,255,0.9)" }}>{color.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div
            className="h-28 rounded-md"
            style={{
              backgroundColor: color.hex,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium" style={{ textShadow: "0 1px 0 rgba(255,255,255,0.9)" }}>
                Hex
              </p>
              <div className="flex items-center gap-2">
                <code
                  className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
                  style={{
                    background: "#f0f0f0",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {color.hex}
                </code>
                <button
                  onClick={() => copyToClipboard(color.hex, "hex")}
                  className="text-gray-500 hover:text-gray-700"
                  style={{
                    background: copied === "hex" ? "#e8f4e8" : "#f0f0f0",
                    padding: "4px",
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {copied === "hex" ? (
                    <Check className="h-4 w-4" style={{ color: "#4CAF50" }} />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium" style={{ textShadow: "0 1px 0 rgba(255,255,255,0.9)" }}>
                RGB
              </p>
              <div className="flex items-center gap-2">
                <code
                  className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
                  style={{
                    background: "#f0f0f0",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {color.rgb.join(", ")}
                </code>
                <button
                  onClick={() => copyToClipboard(color.rgb.join(", "), "rgb")}
                  className="text-gray-500 hover:text-gray-700"
                  style={{
                    background: copied === "rgb" ? "#e8f4e8" : "#f0f0f0",
                    padding: "4px",
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {copied === "rgb" ? (
                    <Check className="h-4 w-4" style={{ color: "#4CAF50" }} />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {color.coloro && (
              <div className="space-y-1">
                <p className="text-sm font-medium" style={{ textShadow: "0 1px 0 rgba(255,255,255,0.9)" }}>
                  Coloro
                </p>
                <code
                  className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
                  style={{
                    background: "#f0f0f0",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {color.coloro}
                </code>
              </div>
            )}

            {color.pantone_tcx && (
              <div className="space-y-1">
                <p className="text-sm font-medium" style={{ textShadow: "0 1px 0 rgba(255,255,255,0.9)" }}>
                  Pantone TCX
                </p>
                <code
                  className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
                  style={{
                    background: "#f0f0f0",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {color.pantone_tcx}
                </code>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
