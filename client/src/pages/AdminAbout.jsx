
import { useState, useEffect } from "react";
import api from "../api/api";
import "./AdminAbout.css";

function AdminAbout() {
  const [about, setAbout] = useState({
    title: "",
    subtitle: "",
    description: "",
    bottom_text: ""
  });

  const [formData, setFormData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get("/about");
        setAbout(response.data);
      } catch (error) {
        console.error("Error fetching About:", error);
      }
    };

    fetchAbout();
  }, []);

  const handleEdit = () => {
    setFormData({ ...about });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = sessionStorage.getItem("adminToken");

      await api.put("/about", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const response = await api.get("/about");
      setAbout(response.data);

      handleCancel();
      alert("About updated successfully!");
    } catch (error) {
      console.error("Error updating About:", error);
      alert("Failed to update About");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-about">
      <div className="admin-about-header">
        <div>
          <h2>Manage About</h2>
          <p>Manage your clinic information.</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="edit-about-btn"
            onClick={handleEdit}
          >
            Edit About
          </button>
        )}
      </div>

      {!showForm ? (
        <div className="about-preview">
          <h3>{about.title}</h3>
          <h4>{about.subtitle}</h4>
          <p>{about.description}</p>
          <p className="about-preview-bottom">
            {about.bottom_text}
          </p>
        </div>
      ) : (
        <form
          className="admin-about-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="about-title">Title</label>
          <input
            id="about-title"
            name="title"
            type="text"
            value={formData?.title ?? ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="about-subtitle">Subtitle</label>
          <input
            id="about-subtitle"
            name="subtitle"
            type="text"
            value={formData?.subtitle ?? ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="about-description">Description</label>
          <textarea
            id="about-description"
            name="description"
            value={formData?.description ?? ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="about-bottom">Bottom Text</label>
          <input
            id="about-bottom"
            name="bottom_text"
            type="text"
            value={formData?.bottom_text ?? ""}
            onChange={handleChange}
            required
          />

          <div className="about-form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="cancel-about-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default AdminAbout;
