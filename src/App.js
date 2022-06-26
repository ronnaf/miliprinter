import { useState } from "react";
import { Printable } from "./Printable";
import "./styles.css";

export default function App() {
  const [link, setLink] = useState("");
  const [images, setImages] = useState([]);

  function handleAdd() {
    if (!link) return;
    // Push link to images
    setImages([...images, link]);
    // Reset link
    setLink("");
  }

  return (
    <div>
      <nav id="header" className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <div className="navbar-brand">Miliprinter</div>
        </div>
      </nav>
      <main className="container-fluid my-4 d-grid gap-4">
        <div id="form">
          <label className="form-label">Add image to print</label>
          <div className="d-flex align-items-center">
            <div>
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setImages([...images, URL.createObjectURL(file)]);
                }}
              />
            </div>
            <div className="mx-3">OR</div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter image link"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  handleAdd();
                }}
              />
            </div>
          </div>
        </div>
        {!!images.length && (
          <div id="print-area" className="d-flex p-3 border rounded bg-primary bg-opacity-10">
            {images.map((image, i) => (
              <Printable
                key={image}
                src={image}
                onRemove={() => {
                  const newImages = [...images];
                  newImages.splice(i, 1);
                  setImages(newImages);
                }}
              />
            ))}
          </div>
        )}
        <div id="footer">
          <button className="btn btn-primary" onClick={window.print}>
            Ready to print!
          </button>
        </div>
      </main>
    </div>
  );
}
