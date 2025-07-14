from fastapi import FastAPI, UploadFile, File, Response
from fastapi.responses import StreamingResponse
from rembg import remove
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti ini saat production ke domain frontend kamu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/remove-bg")
async def remove_background(file: UploadFile = File(...)):
    input_bytes = await file.read()
    output_bytes = remove(input_bytes)
    print("Processed image size:", len(output_bytes))
    return Response(content=output_bytes, media_type="image/png")
