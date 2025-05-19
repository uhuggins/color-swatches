import EnhancedColorPaletteTabs from "@/components/enhanced-color-palette-tabs";
import { palettes } from "@/data/palettes";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <EnhancedColorPaletteTabs palettes={palettes} />
      </div>
    </div>
  );
}
