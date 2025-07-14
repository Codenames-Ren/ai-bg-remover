from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from rembg import remove
from io import BytesIO

app = FastAPI()

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    input_bytes = await file.read()
    output_bytes = remove(input_bytes)
    return StreamingResponse(BytesIO(output_bytes), media_type="image/png")