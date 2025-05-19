"use client"

import type React from "react"
import { useState } from "react"
import { Info, ChevronRight, Palette, Eye } from "lucide-react"
import ColorDetailView from "./color-detail-view"

interface Color {
  name: string
  swatch_id: string
  coloro: string
  pantone_tcx: string | null
  hex: string
  rgb: number[]
  proportion_units: number
}

interface Palette {
  name: string
  source_page: number
  colors: Color[]
  total_proportion_units: number
}

interface ProductImage {
  name: string
  path: string
  originalPath: string
}

// Product images mapping for each palette with original images
// Product images mapping for each palette with original images
const paletteImages: Record<string, ProductImage[]> = {
  "Simple Neutrals": [
    { 
      name: "Sophia Toile Blue-Pearl Quilts", 
      path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK.jpg"
    },
    { 
      name: "Polly Daisy Silver-Pink", 
      path: "/recolored_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK.jpg"
    },
    { 
      name: "Marshalls Floral Brocade-Blush Quilts", 
      path: "/recolored_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK_simple_neutrals.png",
      originalPath: "/original_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK.jpg"
    },
    { 
      name: "Nikita Floral-Butter Quilts", 
      path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK.jpg"
    },
    { 
      name: "Masie Block Floral Scallop Edge-Ballet", 
      path: "/recolored_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK.jpg"
    },
    { 
      name: "Newport Seersucker with Scallop-Blue", 
      path: "/recolored_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK.jpg"
    },
    { 
      name: "Hotel Scallop-Pool", 
      path: "/recolored_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK.jpg"
    },
    { 
      name: "5 Line midnight on white Shower Curtain", 
      path: "/recolored_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_simple_neutrals.png",
      originalPath: "/original_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
    },
    { 
      name: "Sophia Toile Blue-Pearl Duvet Set", 
      path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK.jpg"
    },
    { 
      name: "Cali Paisley-Shell", 
      path: "/recolored_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK.jpg"
    },
    { 
      name: "Renee-Ether", 
      path: "/recolored_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK.jpg"
    },
    { 
      name: "Marshalls Diamond Blooms Green-Multi", 
      path: "/recolored_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK_simple_neutrals.png",
      originalPath: "/original_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK.jpg"
    },
    { 
      name: "5 Line fuchsia on white Shower Curtain", 
      path: "/recolored_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_simple_neutrals.png",
      originalPath: "/original_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
    },
    { 
      name: "Mashalls Spring Break Floral Engineered-Bright Blue", 
      path: "/recolored_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK_simple_neutrals.png",
      originalPath: "/original_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK.jpg"
    },
    { 
      name: "Shroom Daisy Pale-Lavendar", 
      path: "/recolored_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK.jpg"
    },
    { 
      name: "Adina Jacobean Bright-Multi Shower Curtain", 
      path: "/recolored_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK_simple_neutrals.png",
      originalPath: "/original_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK.jpg"
    },
    { 
      name: "Canada Heart Crinkle-Blush", 
      path: "/recolored_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK_simple_neutrals.png",
      originalPath: "/original_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK.jpg"
    },
    { 
      name: "Cali Paisley-Rain", 
      path: "/recolored_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK.jpg"
    },
    { 
      name: "Checker Club with Tiger Soft-White", 
      path: "/recolored_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK.jpg"
    },
    { 
      name: "Butterfly Damask Halogen-Blue", 
      path: "/recolored_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK.jpg"
    },
    { 
      name: "Deval Floral Jacobean Blue-Green-Yellow Shower Curtain", 
      path: "/recolored_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK_simple_neutrals.png",
      originalPath: "/original_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK.jpg"
    },
    { 
      name: "Pencil Stripe-Seaglass Duvet Set", 
      path: "/recolored_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK.jpg"
    },
    { 
      name: "Nikita Floral-Butter Duvet Set", 
      path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK.jpg"
    },
    { 
      name: "European Scallop Hotel-White", 
      path: "/recolored_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK.jpg"
    },
    { 
      name: "Ariel Jacobean Window Valance", 
      path: "/recolored_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK.jpg"
    },
    { 
      name: "Masie Block Floral scalloped edge-Soft Ether Green", 
      path: "/recolored_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK.jpg"
    },
    { 
      name: "Amelia Eyelet White-Skayway", 
      path: "/recolored_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK.jpg"
    },
    { 
      name: "Marshalls Twilight Tiger Jungle Blue-Multi", 
      path: "/recolored_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK_simple_neutrals.png",
      originalPath: "/original_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK.jpg"
    },
    { 
      name: "Patched Jacobean Terra-Cotta", 
      path: "/recolored_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK.jpg"
    },
    { 
      name: "Rayna Antique-White", 
      path: "/recolored_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK.jpg"
    },
    { 
      name: "Marshalls Bloom Capsule Bright-Multi", 
      path: "/recolored_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK_simple_neutrals.png",
      originalPath: "/original_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK.jpg"
    },
    { 
      name: "Glacier Floral-Sage", 
      path: "/recolored_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK.jpg"
    },
    { 
      name: "Diamond Blooms-Sage", 
      path: "/recolored_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK.jpg"
    },
    { 
      name: "Senna Latte Soft-Linen", 
      path: "/recolored_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK.jpg"
    },
    { 
      name: "English Manor Coral-Blue Shower Curtain", 
      path: "/recolored_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK_simple_neutrals.png",
      originalPath: "/original_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
    },
    { 
      name: "Kiara Texture-White Shower Curtain", 
      path: "/recolored_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK_simple_neutrals.png",
      originalPath: "/original_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK.jpg"
    },
    { 
      name: "Kyra Rain-Rain", 
      path: "/recolored_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK.jpg"
    },
    { 
      name: "Ariel Jacobean Window Panel", 
      path: "/recolored_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK.jpg"
    },
    { 
      name: "Cali Paisley-Sage", 
      path: "/recolored_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK_simple_neutrals.png",
      originalPath: "/original_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK.jpg"
    },
    { 
      name: "Sadie Scallop-Salmon", 
      path: "/recolored_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129_simple_neutrals.png",
      originalPath: "/original_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129.jpg"
    },
  ],
  "Enriched Classics": [
  { 
    name: "Sophia Toile Blue-Pearl Quilts", 
    path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK.jpg"
  },
  { 
    name: "Polly Daisy Silver-Pink", 
    path: "/recolored_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK.jpg"
  },
  { 
    name: "Marshalls Floral Brocade-Blush Quilts", 
    path: "/recolored_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK_enriched_classics.png",
    originalPath: "/original_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK.jpg"
  },
  { 
    name: "Nikita Floral-Butter Quilts", 
    path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK.jpg"
  },
  { 
    name: "Masie Block Floral Scallop Edge-Ballet", 
    path: "/recolored_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK.jpg"
  },
  { 
    name: "Newport Seersucker with Scallop-Blue", 
    path: "/recolored_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK.jpg"
  },
  { 
    name: "Hotel Scallop-Pool", 
    path: "/recolored_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK.jpg"
  },
  { 
    name: "5 Line midnight on white Shower Curtain", 
    path: "/recolored_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_enriched_classics.png",
    originalPath: "/original_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Sophia Toile Blue-Pearl Duvet Set", 
    path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK.jpg"
  },
  { 
    name: "Cali Paisley-Shell", 
    path: "/recolored_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK.jpg"
  },
  { 
    name: "Renee-Ether", 
    path: "/recolored_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK.jpg"
  },
  { 
    name: "Marshalls Diamond Blooms Green-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK_enriched_classics.png",
    originalPath: "/original_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK.jpg"
  },
  { 
    name: "5 Line fuchsia on white Shower Curtain", 
    path: "/recolored_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_enriched_classics.png",
    originalPath: "/original_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Mashalls Spring Break Floral Engineered-Bright Blue", 
    path: "/recolored_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK_enriched_classics.png",
    originalPath: "/original_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK.jpg"
  },
  { 
    name: "Shroom Daisy Pale-Lavendar", 
    path: "/recolored_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK.jpg"
  },
  { 
    name: "Adina Jacobean Bright-Multi Shower Curtain", 
    path: "/recolored_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK_enriched_classics.png",
    originalPath: "/original_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK.jpg"
  },
  { 
    name: "Canada Heart Crinkle-Blush", 
    path: "/recolored_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK_enriched_classics.png",
    originalPath: "/original_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK.jpg"
  },
  { 
    name: "Cali Paisley-Rain", 
    path: "/recolored_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK.jpg"
  },
  { 
    name: "Checker Club with Tiger Soft-White", 
    path: "/recolored_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK.jpg"
  },
  { 
    name: "Butterfly Damask Halogen-Blue", 
    path: "/recolored_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK.jpg"
  },
  { 
    name: "Deval Floral Jacobean Blue-Green-Yellow Shower Curtain", 
    path: "/recolored_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK_enriched_classics.png",
    originalPath: "/original_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK.jpg"
  },
  { 
    name: "Pencil Stripe-Seaglass Duvet Set", 
    path: "/recolored_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK.jpg"
  },
  { 
    name: "Nikita Floral-Butter Duvet Set", 
    path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK.jpg"
  },
  { 
    name: "European Scallop Hotel-White", 
    path: "/recolored_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK_enriched_classics.png",
    originalPath: "/original_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK.jpg"
  },
  { 
    name: "Ariel Jacobean Window Valance", 
    path: "/recolored_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK.jpg"
  },
  { 
    name: "Masie Block Floral scalloped edge-Soft Ether Green", 
    path: "/recolored_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK.jpg"
  },
  { 
    name: "Amelia Eyelet White-Skayway", 
    path: "/recolored_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK.jpg"
  },
  { 
    name: "Marshalls Twilight Tiger Jungle Blue-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK_enriched_classics.png",
    originalPath: "/original_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK.jpg"
  },
  { 
    name: "Patched Jacobean Terra-Cotta", 
    path: "/recolored_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK.jpg"
  },
  { 
    name: "Rayna Antique-White", 
    path: "/recolored_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK.jpg"
  },
  { 
    name: "Marshalls Bloom Capsule Bright-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK_enriched_classics.png",
    originalPath: "/original_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK.jpg"
  },
  { 
    name: "Glacier Floral-Sage", 
    path: "/recolored_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK.jpg"
  },
  { 
    name: "Diamond Blooms-Sage", 
    path: "/recolored_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK.jpg"
  },
  { 
    name: "Senna Latte Soft-Linen", 
    path: "/recolored_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK.jpg"
  },
  { 
    name: "English Manor Coral-Blue Shower Curtain", 
    path: "/recolored_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK_enriched_classics.png",
    originalPath: "/original_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Kiara Texture-White Shower Curtain", 
    path: "/recolored_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK_enriched_classics.png",
    originalPath: "/original_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK.jpg"
  },
  { 
    name: "Kyra Rain-Rain", 
    path: "/recolored_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK.jpg"
  },
  { 
    name: "Ariel Jacobean Window Panel", 
    path: "/recolored_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK.jpg"
  },
  { 
    name: "Cali Paisley-Sage", 
    path: "/recolored_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK_enriched_classics.png",
    originalPath: "/original_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK.jpg"
  },
  { 
    name: "Sadie Scallop-Salmon", 
    path: "/recolored_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129_enriched_classics.png",
    originalPath: "/original_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129.jpg"
  },
],
"Statement Primaries": [
  { 
    name: "Sophia Toile Blue-Pearl Quilts", 
    path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK.jpg"
  },
  { 
    name: "Polly Daisy Silver-Pink", 
    path: "/recolored_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK.jpg"
  },
  { 
    name: "Marshalls Floral Brocade-Blush Quilts", 
    path: "/recolored_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK_statement_primaries.png",
    originalPath: "/original_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK.jpg"
  },
  { 
    name: "Nikita Floral-Butter Quilts", 
    path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK.jpg"
  },
  { 
    name: "Masie Block Floral Scallop Edge-Ballet", 
    path: "/recolored_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK.jpg"
  },
  { 
    name: "Newport Seersucker with Scallop-Blue", 
    path: "/recolored_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK.jpg"
  },
  { 
    name: "Hotel Scallop-Pool", 
    path: "/recolored_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK.jpg"
  },
  { 
    name: "5 Line midnight on white Shower Curtain", 
    path: "/recolored_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_statement_primaries.png",
    originalPath: "/original_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Sophia Toile Blue-Pearl Duvet Set", 
    path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK.jpg"
  },
  { 
    name: "Cali Paisley-Shell", 
    path: "/recolored_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK.jpg"
  },
  { 
    name: "Renee-Ether", 
    path: "/recolored_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK.jpg"
  },
  { 
    name: "Marshalls Diamond Blooms Green-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK_statement_primaries.png",
    originalPath: "/original_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK.jpg"
  },
  { 
    name: "5 Line fuchsia on white Shower Curtain", 
    path: "/recolored_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_statement_primaries.png",
    originalPath: "/original_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Mashalls Spring Break Floral Engineered-Bright Blue", 
    path: "/recolored_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK_statement_primaries.png",
    originalPath: "/original_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK.jpg"
  },
  { 
    name: "Shroom Daisy Pale-Lavendar", 
    path: "/recolored_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK.jpg"
  },
  { 
    name: "Adina Jacobean Bright-Multi Shower Curtain", 
    path: "/recolored_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK_statement_primaries.png",
    originalPath: "/original_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK.jpg"
  },
  { 
    name: "Canada Heart Crinkle-Blush", 
    path: "/recolored_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK_statement_primaries.png",
    originalPath: "/original_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK.jpg"
  },
  { 
    name: "Cali Paisley-Rain", 
    path: "/recolored_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK.jpg"
  },
  { 
    name: "Checker Club with Tiger Soft-White", 
    path: "/recolored_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK.jpg"
  },
  { 
    name: "Butterfly Damask Halogen-Blue", 
    path: "/recolored_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK.jpg"
  },
  { 
    name: "Deval Floral Jacobean Blue-Green-Yellow Shower Curtain", 
    path: "/recolored_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK_statement_primaries.png",
    originalPath: "/original_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK.jpg"
  },
  { 
    name: "Pencil Stripe-Seaglass Duvet Set", 
    path: "/recolored_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK.jpg"
  },
  { 
    name: "Nikita Floral-Butter Duvet Set", 
    path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK.jpg"
  },
  { 
    name: "European Scallop Hotel-White", 
    path: "/recolored_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK_statement_primaries.png",
    originalPath: "/original_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK.jpg"
  },
  { 
    name: "Ariel Jacobean Window Valance", 
    path: "/recolored_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK.jpg"
  },
  { 
    name: "Masie Block Floral scalloped edge-Soft Ether Green", 
    path: "/recolored_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK.jpg"
  },
  { 
    name: "Amelia Eyelet White-Skayway", 
    path: "/recolored_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK.jpg"
  },
  { 
    name: "Marshalls Twilight Tiger Jungle Blue-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK_statement_primaries.png",
    originalPath: "/original_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK.jpg"
  },
  { 
    name: "Patched Jacobean Terra-Cotta", 
    path: "/recolored_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK.jpg"
  },
  { 
    name: "Rayna Antique-White", 
    path: "/recolored_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK.jpg"
  },
  { 
    name: "Marshalls Bloom Capsule Bright-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK_statement_primaries.png",
    originalPath: "/original_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK.jpg"
  },
  { 
    name: "Glacier Floral-Sage", 
    path: "/recolored_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK.jpg"
  },
  { 
    name: "Diamond Blooms-Sage", 
    path: "/recolored_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK.jpg"
  },
  { 
    name: "Senna Latte Soft-Linen", 
    path: "/recolored_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK.jpg"
  },
  { 
    name: "English Manor Coral-Blue Shower Curtain", 
    path: "/recolored_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK_statement_primaries.png",
    originalPath: "/original_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Kiara Texture-White Shower Curtain", 
    path: "/recolored_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK_statement_primaries.png",
    originalPath: "/original_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK.jpg"
  },
  { 
    name: "Kyra Rain-Rain", 
    path: "/recolored_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK.jpg"
  },
  { 
    name: "Ariel Jacobean Window Panel", 
    path: "/recolored_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK.jpg"
  },
  { 
    name: "Cali Paisley-Sage", 
    path: "/recolored_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK_statement_primaries.png",
    originalPath: "/original_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK.jpg"
  },
  { 
    name: "Sadie Scallop-Salmon", 
    path: "/recolored_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129_statement_primaries.png",
    originalPath: "/original_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129.jpg"
  },
],
 "Bold Beautility": [
  { 
    name: "Sophia Toile Blue-Pearl Quilts", 
    path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK.jpg"
  },
  { 
    name: "Polly Daisy Silver-Pink", 
    path: "/recolored_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK.jpg"
  },
  { 
    name: "Marshalls Floral Brocade-Blush Quilts", 
    path: "/recolored_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK_bold_beautility.png",
    originalPath: "/original_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK.jpg"
  },
  { 
    name: "Nikita Floral-Butter Quilts", 
    path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK.jpg"
  },
  { 
    name: "Masie Block Floral Scallop Edge-Ballet", 
    path: "/recolored_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK.jpg"
  },
  { 
    name: "Newport Seersucker with Scallop-Blue", 
    path: "/recolored_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK.jpg"
  },
  { 
    name: "Hotel Scallop-Pool", 
    path: "/recolored_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK.jpg"
  },
  { 
    name: "5 Line midnight on white Shower Curtain", 
    path: "/recolored_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_bold_beautility.png",
    originalPath: "/original_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Sophia Toile Blue-Pearl Duvet Set", 
    path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK.jpg"
  },
  { 
    name: "Cali Paisley-Shell", 
    path: "/recolored_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK.jpg"
  },
  { 
    name: "Renee-Ether", 
    path: "/recolored_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK.jpg"
  },
  { 
    name: "Marshalls Diamond Blooms Green-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK_bold_beautility.png",
    originalPath: "/original_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK.jpg"
  },
  { 
    name: "5 Line fuchsia on white Shower Curtain", 
    path: "/recolored_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_bold_beautility.png",
    originalPath: "/original_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Mashalls Spring Break Floral Engineered-Bright Blue", 
    path: "/recolored_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK_bold_beautility.png",
    originalPath: "/original_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK.jpg"
  },
  { 
    name: "Shroom Daisy Pale-Lavendar", 
    path: "/recolored_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK.jpg"
  },
  { 
    name: "Adina Jacobean Bright-Multi Shower Curtain", 
    path: "/recolored_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK_bold_beautility.png",
    originalPath: "/original_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK.jpg"
  },
  { 
    name: "Canada Heart Crinkle-Blush", 
    path: "/recolored_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK_bold_beautility.png",
    originalPath: "/original_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK.jpg"
  },
  { 
    name: "Cali Paisley-Rain", 
    path: "/recolored_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK.jpg"
  },
  { 
    name: "Checker Club with Tiger Soft-White", 
    path: "/recolored_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK.jpg"
  },
  { 
    name: "Butterfly Damask Halogen-Blue", 
    path: "/recolored_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK.jpg"
  },
  { 
    name: "Deval Floral Jacobean Blue-Green-Yellow Shower Curtain", 
    path: "/recolored_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK_bold_beautility.png",
    originalPath: "/original_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK.jpg"
  },
  { 
    name: "Pencil Stripe-Seaglass Duvet Set", 
    path: "/recolored_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK.jpg"
  },
  { 
    name: "Nikita Floral-Butter Duvet Set", 
    path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK.jpg"
  },
  { 
    name: "European Scallop Hotel-White", 
    path: "/recolored_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK_bold_beautility.png",
    originalPath: "/original_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK.jpg"
  },
  { 
    name: "Ariel Jacobean Window Valance", 
    path: "/recolored_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK.jpg"
  },
  { 
    name: "Masie Block Floral scalloped edge-Soft Ether Green", 
    path: "/recolored_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK.jpg"
  },
  { 
    name: "Amelia Eyelet White-Skayway", 
    path: "/recolored_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK.jpg"
  },
  { 
    name: "Marshalls Twilight Tiger Jungle Blue-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK_bold_beautility.png",
    originalPath: "/original_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK.jpg"
  },
  { 
    name: "Patched Jacobean Terra-Cotta", 
    path: "/recolored_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK.jpg"
  },
  { 
    name: "Rayna Antique-White", 
    path: "/recolored_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK.jpg"
  },
  { 
    name: "Marshalls Bloom Capsule Bright-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK_bold_beautility.png",
    originalPath: "/original_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK.jpg"
  },
  { 
    name: "Glacier Floral-Sage", 
    path: "/recolored_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK.jpg"
  },
  { 
    name: "Diamond Blooms-Sage", 
    path: "/recolored_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK.jpg"
  },
  { 
    name: "Senna Latte Soft-Linen", 
    path: "/recolored_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK.jpg"
  },
  { 
    name: "English Manor Coral-Blue Shower Curtain", 
    path: "/recolored_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK_bold_beautility.png",
    originalPath: "/original_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Kiara Texture-White Shower Curtain", 
    path: "/recolored_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK_bold_beautility.png",
    originalPath: "/original_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK.jpg"
  },
  { 
    name: "Kyra Rain-Rain", 
    path: "/recolored_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK.jpg"
  },
  { 
    name: "Ariel Jacobean Window Panel", 
    path: "/recolored_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK.jpg"
  },
  { 
    name: "Cali Paisley-Sage", 
    path: "/recolored_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK_bold_beautility.png",
    originalPath: "/original_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK.jpg"
  },
  { 
    name: "Sadie Scallop-Salmon", 
    path: "/recolored_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129_bold_beautility.png",
    originalPath: "/original_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129.jpg"
  },
 ],
 "Dissolving Pastels": [
  { 
    name: "Sophia Toile Blue-Pearl Quilts", 
    path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Quilts_PO_3550_YT_20240125_OK.jpg"
  },
  { 
    name: "Polly Daisy Silver-Pink", 
    path: "/recolored_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Polly_Daisy_Silver-Pink_3pcs_PO_3551_ZD_20240111_OK.jpg"
  },
  { 
    name: "Marshalls Floral Brocade-Blush Quilts", 
    path: "/recolored_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK_dissolving_pastels.png",
    originalPath: "/original_images/Ecom_Marshalls_Floral_Brocade-Blush_3pcs_Quilts_PO_3624_Koh_20240115_OK.jpg"
  },
  { 
    name: "Nikita Floral-Butter Quilts", 
    path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Quilts_PO_3550_YT_20240123_2_OK.jpg"
  },
  { 
    name: "Masie Block Floral Scallop Edge-Ballet", 
    path: "/recolored_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Masie_Block_Floral_Scallop_Edge-Ballet_3pcs_Quilts_PO_3690_Koh_20240122_OK.jpg"
  },
  { 
    name: "Newport Seersucker with Scallop-Blue", 
    path: "/recolored_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Newport_Seersucker_with_Scallop-Blue_3pcs_PO_3550_YT_20240118_1_OK.jpg"
  },
  { 
    name: "Hotel Scallop-Pool", 
    path: "/recolored_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Hotel_Scallop-Pool_6pcs_PO_3693_Koh_20240118_OK.jpg"
  },
  { 
    name: "5 Line midnight on white Shower Curtain", 
    path: "/recolored_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_dissolving_pastels.png",
    originalPath: "/original_images/5_Line_midnight_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Sophia Toile Blue-Pearl Duvet Set", 
    path: "/recolored_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Sophia_Toile_Blue-Pearl_3pcs_Duvet_set_PO_3550_YT_20240125_OK.jpg"
  },
  { 
    name: "Cali Paisley-Shell", 
    path: "/recolored_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Cali_Paisley-Shell_6pcs_Po_3621_Koh_20240124_OK.jpg"
  },
  { 
    name: "Renee-Ether", 
    path: "/recolored_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Renee-Ether_6pcs_PO_3554_Koh_20240104_OK.jpg"
  },
  { 
    name: "Marshalls Diamond Blooms Green-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK_dissolving_pastels.png",
    originalPath: "/original_images/Ecom_Marshalls_Diamond_Blooms_Green-Multi_3pcs_Quilts_PO_3624_Koh_20241112_2_OK.jpg"
  },
  { 
    name: "5 Line fuchsia on white Shower Curtain", 
    path: "/recolored_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK_dissolving_pastels.png",
    originalPath: "/original_images/5_Line_fuchsia_on_white_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Mashalls Spring Break Floral Engineered-Bright Blue", 
    path: "/recolored_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK_dissolving_pastels.png",
    originalPath: "/original_images/Ecom_Mashalls_Spring_Break_Floral_Engineered-_Bright_Blue_3pcs_Quilts_PO_3624_Koh_20240129_OK.jpg"
  },
  { 
    name: "Shroom Daisy Pale-Lavendar", 
    path: "/recolored_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Shroom_Daisy_Pale-Lavendar_3pcs_PR_2018_ZD_20240111_OK.jpg"
  },
  { 
    name: "Adina Jacobean Bright-Multi Shower Curtain", 
    path: "/recolored_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK_dissolving_pastels.png",
    originalPath: "/original_images/Adina_Jacobean_Bright-Multi_Shower_Curtain_PO_3654_Koh_20240126_OK.jpg"
  },
  { 
    name: "Canada Heart Crinkle-Blush", 
    path: "/recolored_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK_dissolving_pastels.png",
    originalPath: "/original_images/Canada_Heart_Crinkle-Blush_3pcs_PO_3607_BW_20240118_1_OK.jpg"
  },
  { 
    name: "Cali Paisley-Rain", 
    path: "/recolored_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Cali_Paisley-Rain_6pcs_PO_3621_Koh_20240124_OK.jpg"
  },
  { 
    name: "Checker Club with Tiger Soft-White", 
    path: "/recolored_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Checker_Club_with_Tiger_Soft-White_10pcs_PO_3550_YT_20240122_2_OK.jpg"
  },
  { 
    name: "Butterfly Damask Halogen-Blue", 
    path: "/recolored_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Butterfly_Damask_Halogen-Blue_3pcs_PO_3551_ZD_20240111_OK.jpg"
  },
  { 
    name: "Deval Floral Jacobean Blue-Green-Yellow Shower Curtain", 
    path: "/recolored_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK_dissolving_pastels.png",
    originalPath: "/original_images/Deval_Floral_Jacobean_Blue-Green-Yellow_Shower_Curtain_PO_3654_Koh_20240129_1_OK.jpg"
  },
  { 
    name: "Pencil Stripe-Seaglass Duvet Set", 
    path: "/recolored_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Pencil_Stripe-Seaglass_3pcs_Duvet_set_PO_3620_YT_20240130_2_OK.jpg"
  },
  { 
    name: "Nikita Floral-Butter Duvet Set", 
    path: "/recolored_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Nikita_Floral-Butter_3pcs_Duvet_set_PO_3550_YT_20240122_1_OK.jpg"
  },
  { 
    name: "European Scallop Hotel-White", 
    path: "/recolored_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_European_Scallop_Hotel-White_5pc_Bring_in_Koh_20231229_OK.jpg"
  },
  { 
    name: "Ariel Jacobean Window Valance", 
    path: "/recolored_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Ariel_Jacobean_Window_Valance_PO_3567_Koh_20240129_OK.jpg"
  },
  { 
    name: "Masie Block Floral scalloped edge-Soft Ether Green", 
    path: "/recolored_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Masie_Block_Floral_scalloped_edge-Soft_Ether_Green_3pcs_Quilts_PO_3693_Koh_20240122_OK.jpg"
  },
  { 
    name: "Amelia Eyelet White-Skayway", 
    path: "/recolored_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Amelia_Eyelet_White-Skayway_6pcs_PO_3550_YT_20240117_1_OK.jpg"
  },
  { 
    name: "Marshalls Twilight Tiger Jungle Blue-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK_dissolving_pastels.png",
    originalPath: "/original_images/Ecom_Marshalls_Twilight_Tiger_Jungle_Blue-Multi_3pcs_Quilts_PO_3624_Koh_20240116_3_OK.jpg"
  },
  { 
    name: "Patched Jacobean Terra-Cotta", 
    path: "/recolored_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Patched_Jacobean_Terra-Cotta_3pcs_Quilts_PO_3621_Koh_20230116_OK.jpg"
  },
  { 
    name: "Rayna Antique-White", 
    path: "/recolored_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Rayna_Antique-White_10pcs_PO_3709_YT_20240130_2_OK.jpg"
  },
  { 
    name: "Marshalls Bloom Capsule Bright-Multi", 
    path: "/recolored_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK_dissolving_pastels.png",
    originalPath: "/original_images/Ecom_Marshalls_Bloom_Capsule_Bright-Multi_3pcs_Quilts_PO_3624_Koh_20240115_3_OK.jpg"
  },
  { 
    name: "Glacier Floral-Sage", 
    path: "/recolored_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Glacier_Floral-Sage_10pcs_PO_3550_YT_20240115_1_OK.jpg"
  },
  { 
    name: "Diamond Blooms-Sage", 
    path: "/recolored_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Diamond_Blooms-Sage_3pcs_Quilts_PO_3621_Koh_20240112_1_OK.jpg"
  },
  { 
    name: "Senna Latte Soft-Linen", 
    path: "/recolored_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Senna_Latte_Soft-Linen_3pcs_PO_3550_YT_20240125_1_OK.jpg"
  },
  { 
    name: "English Manor Coral-Blue Shower Curtain", 
    path: "/recolored_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK_dissolving_pastels.png",
    originalPath: "/original_images/English_Manor_Coral-Blue_Shower_Curtain_PO_3654_Koh_20240131_OK.jpg"
  },
  { 
    name: "Kiara Texture-White Shower Curtain", 
    path: "/recolored_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK_dissolving_pastels.png",
    originalPath: "/original_images/Kiara_Texture-White_Shower_Curtain_PO_3655_YT_20240129_OK.jpg"
  },
  { 
    name: "Kyra Rain-Rain", 
    path: "/recolored_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Kyra_Rain-Rain_10pcs_PO_3552_BW_20240117_1_OK.jpg"
  },
  { 
    name: "Ariel Jacobean Window Panel", 
    path: "/recolored_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Ariel_Jacobean__Window_Panel_PO_3567_20240125_OK.jpg"
  },
  { 
    name: "Cali Paisley-Sage", 
    path: "/recolored_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK_dissolving_pastels.png",
    originalPath: "/original_images/HG_Cali_Paisley-Sage_6pcs_PO_3690_Koh_20240125_OK.jpg"
  },
  { 
    name: "Sadie Scallop-Salmon", 
    path: "/recolored_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129_dissolving_pastels.png",
    originalPath: "/original_images/HG_Sadie_Scallop-Salmon_6pcs_PO_3613_YT_20240129.jpg"
  },
],


}
interface ColorPaletteTabsProps {
  palettes: Palette[]
}

export default function EnhancedColorPaletteTabs({ palettes }: ColorPaletteTabsProps) {
  const [activeTab, setActiveTab] = useState(palettes[0]?.name || "")
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  const handleColorClick = (color: Color) => {
    setSelectedColor(color)
    setIsDetailOpen(true)
  }



  // Find the active palette
  const activePalette = palettes.find((palette) => palette.name === activeTab) || palettes[0]
  const activeImages = paletteImages[activeTab] || []

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Skeuomorphic Vertical Tabs */}
        <div className="md:w-80 w-full flex-shrink-0">
          <div className="sticky top-4 overflow-y-auto max-h-[calc(100vh-2rem)]">
            <h2 className="text-xl font-semibold mb-4 px-2">Color Palettes</h2>
            <div className="space-y-3 p-2 bg-gray-100 rounded-lg shadow-inner">
              {palettes.map((palette) => {
                const isActive = activeTab === palette.name

                return (
                  <button
                    key={palette.name}
                    onClick={() => setActiveTab(palette.name)}
                    className={`w-full text-left rounded-md transition-all flex flex-col gap-2 relative overflow-hidden
                      ${
                        isActive
                          ? "bg-white shadow-[0_2px_5px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] transform scale-[1.02] z-10"
                          : "bg-gradient-to-b from-gray-50 to-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.7)] hover:from-white hover:to-gray-100"
                      }`}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${isActive ? "text-gray-800" : "text-gray-600"}`}>
                        {palette.name}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${isActive ? "rotate-90 text-gray-800" : "text-gray-400"}`}
                      />
                    </div>

                    {/* Color swatches in a single line with inner shadow */}
                    <div
                      className="h-8 rounded-md overflow-hidden flex shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]"
                      style={{
                        background: "repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 5px, #e8e8e8 5px, #e8e8e8 10px)",
                      }}
                    >
                      {palette.colors.map((color) => (
                        <div
                          key={`tab-color-${palette.name}-${color.swatch_id}`}
                          className="h-full"
                          style={{
                            backgroundColor: color.hex,
                            width: `${(color.proportion_units / palette.total_proportion_units) * 100}%`,
                            boxShadow: isActive
                              ? "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.1)"
                              : "none",
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>

                    {/* Page indicator with embossed effect */}
                    <div
                      className="absolute bottom-2 right-3 text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: isActive ? "#f0f0f0" : "#e0e0e0",
                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(0,0,0,0.05)",
                        color: "#666",
                      }}
                    >
                      p.{palette.source_page}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Area with Product Images */}
        {activePalette && (
          <div className="flex-1 space-y-6">
            <div
              className="flex items-center justify-between p-4 rounded-lg"
              style={{
                background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <h2 className="text-2xl font-semibold" style={{ textShadow: "0 1px 0 rgba(255,255,255,0.9)" }}>
                  {activePalette.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {activeImages.length} products available in this palette
                </p>
              </div>
              <span
                className="text-sm px-3 py-1 rounded-full"
                style={{
                  background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  color: "#666",
                }}
              >
                Page {activePalette.source_page}
              </span>
            </div>

            {/* Color Palette Preview with 3D effect */}
            <div
              className="rounded-lg overflow-hidden p-2"
              style={{
                background: "#e0e0e0",
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              <div className="flex h-16 rounded-md overflow-hidden">
                {activePalette.colors.map((color) => (
                  <div
                    key={`preview-${activePalette.name}-${color.swatch_id}`}
                    className="h-full cursor-pointer transition-all hover:scale-y-110"
                    style={{
                      backgroundColor: color.hex,
                      width: `${(color.proportion_units / activePalette.total_proportion_units) * 100}%`,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)",
                    }}
                    onClick={() => handleColorClick(color)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Product Images Gallery */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Products in {activePalette.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
                {activeImages.map((image, index) => (
                  <div
                    key={`${activeTab}-${index}`}
                    className="relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] group"
                    style={{
                      borderRadius: "0",
                      boxShadow: "none",
                    }}
                    onMouseEnter={() => setHoveredImage(`${activeTab}-${index}`)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    {/* Recolored Image - Base Layer */}
                    <div className="relative">
                      <img
                        src={image.path}
                        alt={`${image.name} - ${activePalette.name}`}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/file.svg';
                        }}
                      />
                    </div>

                    <div
                      className={`absolute inset-0 z-10 transition-opacity duration-300 ${
                        hoveredImage === `${activeTab}-${index}` ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={image.originalPath}
                        alt={`${image.name} - Original`}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/file.svg';
                        }}
                      />
          <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            Original
          </div>
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white p-1 rounded">
            <Eye className="h-3 w-3" />
          </div>
        </div>

 
        {/* <div className={`absolute inset-0 z-5 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ${
          hoveredImage === `${activeTab}-${index}` ? "opacity-0" : ""
        }`}>
          <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Hover to see original
          </div>
        </div>
 */}

        {/* Product info footer removed */}
      </div>
    ))}
  </div>
</div>

            {/* Palette Details */}
            {/* Statistics footer removed */}
          </div>
        )}
      </div>

      {selectedColor && (
        <ColorDetailView color={selectedColor} isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} />
      )}
    </>
  )
}