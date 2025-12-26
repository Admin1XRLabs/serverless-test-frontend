import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { personImage, clothImage, clothType = 'top' } = await request.json();

    if (!personImage || !clothImage) {
      return NextResponse.json(
        { error: 'Missing personImage or clothImage' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RUNPOD_API_KEY;
    const serverlessId = process.env.RUNPOD_SERVERLESS_ID;

    if (!apiKey || !serverlessId) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing API Key or Serverless ID' },
        { status: 500 }
      );
    }

    // Clothing type settings
    const isBottom = clothType === 'bottom';
    const maskSettings = {
      top_clothes: !isBottom,
      bottom_clothes: isBottom,
      left_arm: !isBottom,
      right_arm: !isBottom,
      left_leg: isBottom,
      right_leg: isBottom,
      maskGrow: isBottom ? 15 : 9, // Increased grow for bottom wear
    };

    // Construct the ComfyUI workflow payload
    // Updated workflow from Changeapiv1 (Copy).json
    const payload = {
      input: {
        workflow: {
          "32": {
            "inputs": {
              "vae_name": "ae.safetensors"
            },
            "class_type": "VAELoader",
            "_meta": {
              "title": "Load VAE"
            }
          },
          "34": {
            "inputs": {
              "clip_name1": "ViT-L-14-BEST-smooth-GmP-TE-only-HF-format.safetensors",
              "clip_name2": "t5xxl_fp16.safetensors",
              "type": "flux",
              "device": "default"
            },
            "class_type": "DualCLIPLoader",
            "_meta": {
              "title": "DualCLIPLoader"
            }
          },
          "187": {
            "inputs": {
              "direction": "left",
              "match_image_size": true,
              "image1": ["504", 0],
              "image2": ["569", 0]
            },
            "class_type": "ImageConcanate",
            "_meta": {
              "title": "Image Concatenate - Ghép ảnh tham chiếu"
            }
          },
          "189": {
            "inputs": {
              "clip_name": "sigclip_vision_patch14_384.safetensors"
            },
            "class_type": "CLIPVisionLoader",
            "_meta": {
              "title": "Load CLIP Vision"
            }
          },
          "190": {
            "inputs": {
              "style_model_name": "flux1-redux-dev.safetensors"
            },
            "class_type": "StyleModelLoader",
            "_meta": {
              "title": "Load Style Model"
            }
          },
          "192": {
            "inputs": {
              "strength": 1,
              "strength_type": "multiply",
              "conditioning": ["195", 0],
              "style_model": ["190", 0],
              "clip_vision_output": ["581", 0]
            },
            "class_type": "StyleModelApply",
            "_meta": {
              "title": "Apply Style Model"
            }
          },
          "193": {
            "inputs": {
              "noise_mask": false,
              "positive": ["192", 0],
              "negative": ["198", 0],
              "vae": ["32", 0],
              "pixels": ["199", 1],
              "mask": ["199", 2]
            },
            "class_type": "InpaintModelConditioning",
            "_meta": {
              "title": "InpaintModelConditioning"
            }
          },
          "195": {
            "inputs": {
              "guidance": 30,
              "conditioning": ["197", 0]
            },
            "class_type": "FluxGuidance",
            "_meta": {
              "title": "FluxGuidance"
            }
          },
          "196": {
            "inputs": {
              "strength": 1,
              "model": ["582", 0]
            },
            "class_type": "DifferentialDiffusion",
            "_meta": {
              "title": "Differential Diffusion"
            }
          },
          "197": {
            "inputs": {
              "text": "32K UHD, ultra-high resolution, extremely sharp, intricate details, masterpiece, realistic, Clothes wrinkle naturally",
              "clip": ["34", 0]
            },
            "class_type": "CLIPTextEncode",
            "_meta": {
              "title": "Nếu ảnh ra không được như ý => Hãy mô tả thêm"
            }
          },
          "198": {
            "inputs": {
              "text": "",
              "clip": ["34", 0]
            },
            "class_type": "CLIPTextEncode",
            "_meta": {
              "title": "CLIP Text Encode (Prompt)"
            }
          },
          "199": {
            "inputs": {
              "context_expand_pixels": 10,
              "context_expand_factor": 1,
              "fill_mask_holes": true,
              "blur_mask_pixels": 0,
              "invert_mask": false,
              "blend_pixels": 32,
              "rescale_algorithm": "bicubic",
              "mode": "ranged size",
              "force_width": 1024,
              "force_height": 1024,
              "rescale_factor": 1.2,
              "min_width": 512,
              "min_height": 512,
              "max_width": 1536,
              "max_height": 1536,
              "padding": 32,
              "image": ["187", 0],
              "mask": ["224", 0],
              "optional_context_mask": ["225", 0]
            },
            "class_type": "InpaintCrop",
            "_meta": {
              "title": "(OLD 💀, use the new ✂️ Inpaint Crop node)"
            }
          },
          "203": {
            "inputs": {
              "samples": ["234", 0],
              "vae": ["32", 0]
            },
            "class_type": "VAEDecode",
            "_meta": {
              "title": "VAE Decode"
            }
          },
          "204": {
            "inputs": {
              "rescale_algorithm": "bislerp",
              "stitch": ["199", 0],
              "inpainted_image": ["203", 0]
            },
            "class_type": "InpaintStitch",
            "_meta": {
              "title": "(OLD 💀, use the new ✂️ Inpaint Stitch node)"
            }
          },
          "206": {
            "inputs": {
              "expand": 10,
              "incremental_expandrate": 0,
              "tapered_corners": true,
              "flip_input": false,
              "blur_radius": 2,
              "lerp_alpha": 1,
              "decay_factor": 1,
              "fill_holes": false,
              "mask": ["518", 1]
            },
            "class_type": "GrowMaskWithBlur",
            "_meta": {
              "title": "Grow Mask With Blur (điều chỉnh mặt nạ trang phục)"
            }
          },
          "210": {
            "inputs": {
              "direction": "left",
              "match_image_size": true,
              "image1": ["219", 0],
              "image2": ["356", 0]
            },
            "class_type": "ImageConcanate",
            "_meta": {
              "title": "Image Concatenate (ghép tạo mặt nạ trang phục)"
            }
          },
          "219": {
            "inputs": {
              "width": ["504", 1],
              "height": ["504", 2],
              "batch_size": 1,
              "color": 0
            },
            "class_type": "EmptyImage",
            "_meta": {
              "title": "EmptyImage"
            }
          },
          "220": {
            "inputs": {
              "width": ["569", 1],
              "height": ["569", 2],
              "batch_size": 1,
              "color": 0
            },
            "class_type": "EmptyImage",
            "_meta": {
              "title": "EmptyImage"
            }
          },
          "221": {
            "inputs": {
              "width": 0,
              "height": ["504", 2],
              "interpolation": "lanczos",
              "method": "keep proportion",
              "condition": "always",
              "multiple_of": 0,
              "image": ["612", 0]
            },
            "class_type": "ImageResize+",
            "_meta": {
              "title": "🔧 Image Resize"
            }
          },
          "223": {
            "inputs": {
              "direction": "left",
              "match_image_size": true,
              "image1": ["221", 0],
              "image2": ["220", 0]
            },
            "class_type": "ImageConcanate",
            "_meta": {
              "title": "Image Concatenate mặt nạ trên người mẫu"
            }
          },
          "224": {
            "inputs": {
              "channel": "red",
              "image": ["223", 0]
            },
            "class_type": "ImageToMask",
            "_meta": {
              "title": "Convert Image to Mask"
            }
          },
          "225": {
            "inputs": {
              "channel": "red",
              "image": ["210", 0]
            },
            "class_type": "ImageToMask",
            "_meta": {
              "title": "Convert Image to Mask"
            }
          },
          "234": {
            "inputs": {
              "seed": Math.floor(Math.random() * 1000000000000000),
              "steps": 8,
              "cfg": 1,
              "sampler_name": "euler",
              "scheduler": "simple",
              "denoise": 1,
              "model": ["196", 0],
              "positive": ["193", 0],
              "negative": ["193", 1],
              "latent_image": ["193", 2]
            },
            "class_type": "KSampler",
            "_meta": {
              "title": "KSampler"
            }
          },
          "296": {
            "inputs": {
              "any_03": ["567", 0]
            },
            "class_type": "Any Switch (rgthree)",
            "_meta": {
              "title": "Any Switch (rgthree)"
            }
          },
          "356": {
            "inputs": {
              "mask": ["206", 0]
            },
            "class_type": "MaskToImage",
            "_meta": {
              "title": "Convert Mask to Image"
            }
          },
          "368": {
            "inputs": {
              "base64_data": clothImage, // Injected Cloth Image
              "image_output": "Preview",
              "save_prefix": "ComfyUI"
            },
            "class_type": "easy loadImageBase64",
            "_meta": {
              "title": "Tải ảnh trang phục"
            }
          },
          "371": {
            "inputs": {
              "any_02": ["405", 1]
            },
            "class_type": "Any Switch (rgthree)",
            "_meta": {
              "title": "Any Switch (rgthree)"
            }
          },
          "404": {
            "inputs": {
              "images": ["487", 0]
            },
            "class_type": "PreviewImage",
            "_meta": {
              "title": "Xem trước mặt nạ tách đồ trên người mẫu"
            }
          },
          "405": {
            "inputs": {
              "base64_data": personImage, // Injected Person Image
              "image_output": "Preview",
              "save_prefix": "ComfyUI"
            },
            "class_type": "easy loadImageBase64",
            "_meta": {
              "title": "Tải ảnh người mẫu"
            }
          },
          "487": {
            "inputs": {
              "direction": "left",
              "match_image_size": true,
              "image1": ["504", 0],
              "image2": ["221", 0]
            },
            "class_type": "ImageConcanate",
            "_meta": {
              "title": "Image Concatenate"
            }
          },
          "504": {
            "inputs": {
              "width": 0,
              "height": ["296", 0],
              "interpolation": "lanczos",
              "method": "keep proportion",
              "condition": "always",
              "multiple_of": 0,
              "image": ["405", 0]
            },
            "class_type": "ImageResize+",
            "_meta": {
              "title": "🔧 Image Resize"
            }
          },
          "518": {
            "inputs": {
              "image": ["570", 0],
              "model": "RMBG-2.0",
              "sensitivity": 0.5,
              "process_res": 768,
              "mask_blur": 0,
              "mask_offset": 0,
              "background": "transparent",
              "invert_output": false,
              "optimize": true
            },
            "class_type": "RMBG",
            "_meta": {
              "title": "RMBG Background Removal"
            }
          },
          "534": {
            "inputs": {
              "width": ["504", 1],
              "height": ["504", 2],
              "position": "top-right",
              "x_offset": 0,
              "y_offset": 0,
              "image": ["204", 0]
            },
            "class_type": "ImageCrop+",
            "_meta": {
              "title": "🔧 Image Crop"
            }
          },
          "539": {
            "inputs": {
              "any_01": ["534", 0],
              "any_02": ["534", 0]
            },
            "class_type": "Any Switch (rgthree)",
            "_meta": {
              "title": "Any Switch (rgthree)"
            }
          },
          "567": {
            "inputs": {
              "value": 1920
            },
            "class_type": "SimpleMathInt+",
            "_meta": {
              "title": "1920 Resolution"
            }
          },
          "569": {
            "inputs": {
              "width": 0,
              "height": ["504", 2],
              "interpolation": "lanczos",
              "method": "keep proportion",
              "condition": "always",
              "multiple_of": 0,
              "image": ["368", 0]
            },
            "class_type": "ImageResize+",
            "_meta": {
              "title": "🔧 Image Resize"
            }
          },
          "570": {
            "inputs": {
              "width": 0,
              "height": ["296", 0],
              "interpolation": "lanczos",
              "method": "keep proportion",
              "condition": "always",
              "multiple_of": 0,
              "image": ["368", 0]
            },
            "class_type": "ImageResize+",
            "_meta": {
              "title": "🔧 Image Resize"
            }
          },
          "577": {
            "inputs": {
              "upscale_method": "lanczos",
              "width": 1216,
              "height": 0,
              "crop": "disabled",
              "image": ["368", 0]
            },
            "class_type": "ImageScale",
            "_meta": {
              "title": "Upscale Image"
            }
          },
          "580": {
            "inputs": {
              "lora_name": "FLUX.1-Turbo-Alpha.safetensors",
              "strength_model": 1,
              "model": ["604", 0]
            },
            "class_type": "LoraLoaderModelOnly",
            "_meta": {
              "title": "LoraLoaderModelOnly"
            }
          },
          "581": {
            "inputs": {
              "crop": "center",
              "clip_vision": ["189", 0],
              "image": ["577", 0]
            },
            "class_type": "CLIPVisionEncode",
            "_meta": {
              "title": "CLIP Vision Encode"
            }
          },
          "582": {
            "inputs": {
              "lora_name": "migrationloracloth.safetensors",
              "strength_model": 1,
              "model": ["599", 0]
            },
            "class_type": "LoraLoaderModelOnly",
            "_meta": {
              "title": "LoraLoaderModelOnly"
            }
          },
          "599": {
            "inputs": {
              "lora_name": "catvton-flux-lora-beta-rank128.safetensors",
              "strength_model": 1,
              "model": ["580", 0]
            },
            "class_type": "LoraLoaderModelOnly",
            "_meta": {
              "title": "LoraLoaderModelOnly"
            }
          },
          "604": {
            "inputs": {
              "unet_name": "flux1-fill-dev.safetensors",
              "weight_dtype": "default"
            },
            "class_type": "UNETLoader",
            "_meta": {
              "title": "Load Diffusion Model"
            }
          },
          "607": {
            "inputs": {
              "filename_prefix": "ComfyUI",
              "images": ["539", 0]
            },
            "class_type": "SaveImage",
            "_meta": {
              "title": "Save Image"
            }
          },
          "608": {
            "inputs": {
              "mask_bbox_padding": 30,
              "resolution": 384,
              "mask_type": "based_on_depth",
              "mask_expand": 5,
              "rand_seed": 88,
              "detect_thr": 0.6,
              "presence_thr": 0.6,
              "image": ["405", 0]
            },
            "class_type": "MeshGraphormer-DepthMapPreprocessor",
            "_meta": {
              "title": "MeshGraphormer Hand Refiner"
            }
          },
          "609": {
            "inputs": {
              "grow": 6,
              "blur": 2,
              "mask": ["608", 1]
            },
            "class_type": "INPAINT_ExpandMask",
            "_meta": {
              "title": "Expand Hand Mask"
            }
          },
          "610": {
            "inputs": {
              "grow": maskSettings.maskGrow,
              "blur": 5,
              "mask": ["613", 1]
            },
            "class_type": "INPAINT_ExpandMask",
            "_meta": {
              "title": "Expand Clothing Mask"
            }
          },
          "611": {
            "inputs": {
              "x": 0,
              "y": 0,
              "operation": "subtract",
              "destination": ["610", 0],
              "source": ["609", 0]
            },
            "class_type": "MaskComposite",
            "_meta": {
              "title": "Subtract Hands from Clothing"
            }
          },
          "612": {
            "inputs": {
              "mask": isBottom ? ["610", 0] : ["611", 0]
            },
            "class_type": "MaskToImage",
            "_meta": {
              "title": "Convert Mask to Image"
            }
          },
          "613": {
            "inputs": {
              "face": false,
              "hair": false,
              "glasses": false,
              "top_clothes": maskSettings.top_clothes,
              "bottom_clothes": maskSettings.bottom_clothes,
              "torso_skin": false,
              "left_arm": maskSettings.left_arm,
              "right_arm": maskSettings.right_arm,
              "left_leg": maskSettings.left_leg,
              "right_leg": maskSettings.right_leg,
              "left_foot": false,
              "right_foot": false,
              "detail_method": "VITMatte",
              "detail_erode": 8,
              "detail_dilate": 6,
              "black_point": 0.01,
              "white_point": 0.99,
              "process_detail": true,
              "device": "cuda",
              "max_megapixels": 2,
              "image": ["405", 0]
            },
            "class_type": "LayerMask: HumanPartsUltra",
            "_meta": {
              "title": "LayerMask: Human Parts Ultra(Advance)"
            }
          }
        }
      }
    };

    const response = await fetch(`https://api.runpod.ai/v2/${serverlessId}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in /api/run:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
