import { useState } from "react";
import { GitHub } from "react-feather";
import { Printable } from "./Printable";
import "./styles.css";

export default function App() {
  const [link, setLink] = useState("");
  const [images, setImages] = useState([]);
  const [isSticker, setIsSticker] = useState(false);

  function handleAdd() {
    if (!link) return;
    // Push link to images
    setImages([...images, link]);
    // Reset link
    setLink("");
  }

  return (
    <div className="d-flex flex-column justify-content-between" style={{ height: "100vh" }}>
      <div>
        <nav id="header" className="navbar navbar-dark bg-primary">
          <div className="container-fluid">
            <div className="navbar-brand">Miliprinter</div>
            <div>
              <GitHub
                color="white"
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  window.open("https://github.com/ronnaf/miliprinter", "_blank", "noopener,noreferrer");
                }}
              />
            </div>
          </div>
        </nav>
        <main className="container-fluid my-4 d-grid gap-4">
          <div id="form">
            <div className="mb-3">
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
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isSticker}
                id="sticker"
                onChange={() => {
                  setIsSticker(!isSticker);
                }}
              />
              <label className="form-check-label" htmlFor="sticker">
                Sticker mode (adds padding)
              </label>
            </div>
          </div>
          {!!images.length && (
            <div id="print-area" className="d-flex flex-wrap p-3 border rounded bg-primary bg-opacity-10">
              {images.map((image, i) => (
                <Printable
                  key={image}
                  src={image}
                  padded={isSticker}
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
            <button className="btn btn-primary" onClick={window.print} disabled={!images.length}>
              Ready to print!
            </button>
          </div>
        </main>
      </div>
      <footer id="copyright" className="container-fluid py-2">
        <small>
          © Ronna Firmo <span style={{ color: "gray" }}>&#47;&#47; 2022</span>
        </small>
      </footer>
    </div>
  );
}
