
import { useState, useEffect } from "react";
import api from "../api/api";
import "./AdminServices.css";

const emptyService = {
  name: "",
  description: "",
  price: "",
  duration: ""
};

function AdminServices() {
  const [services, setServices] = useState([]);
  const [newservice, setNewServices] = useState(emptyService);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setNewServices({ ...emptyService });
    setShowForm(true);
  };

  const handleEdit = (service) => {
    setEditingId(service.id);

    setNewServices({
      name: service.NAME ?? "",
      description: service.DESCRIPTION ?? "",
      price: service.price ?? "",
      duration: service.duration ?? ""
    });

    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setNewServices({ ...emptyService });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = sessionStorage.getItem("adminToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (editingId !== null) {
        await api.put(
          `/services/${editingId}`,
          newservice,
          config
        );
      } else {
        await api.post("/services", newservice, config);
      }

      const response = await api.get("/services");
      setServices(response.data);

      handleCancel();

    } catch (error) {
      console.error("Error saving service:", error);
      alert("Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    try {
      const token = sessionStorage.getItem("adminToken");

      await api.delete(`/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      );

      if (editingId === id) {
        handleCancel();
      }

    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service");
    }
  };

  return (
    <section className="admin-services">

      <div className="admin-services-header">
        <div>
          <h2>Manage Services</h2>
          <p>Add, view, edit, and delete clinic services.</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="add-service-btn"
            onClick={handleAdd}
          >
            + Add Service
          </button>
        )}
      </div>

      {showForm && (
        <form
          className="add-service-form"
          onSubmit={handleSubmit}
        >
          <h3>
            {editingId !== null
              ? "Edit Service"
              : "Add New Service"}
          </h3>

          <input
            type="text"
            placeholder="Service Name"
            value={newservice.name}
            onChange={(e) =>
              setNewServices({
                ...newservice,
                name: e.target.value
              })
            }
            required
          />

          <textarea
            placeholder="Description"
            value={newservice.description}
            onChange={(e) =>
              setNewServices({
                ...newservice,
                description: e.target.value
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            min="0"
            step="0.01"
            value={newservice.price}
            onChange={(e) =>
              setNewServices({
                ...newservice,
                price: e.target.value
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Duration (minutes)"
            min="1"
            value={newservice.duration}
            onChange={(e) =>
              setNewServices({
                ...newservice,
                duration: e.target.value
              })
            }
            required
          />

          <div className="service-form-actions">
            <button type="submit" disabled={saving}>
              {saving
                ? "Saving..."
                : editingId !== null
                ? "Update Service"
                : "Save Service"}
            </button>

            <button
              type="button"
              className="cancel-service-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="services-table-wrapper">
      <table  className="services-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.NAME}</td>
              <td>{service.DESCRIPTION}</td>
              <td>${service.price}</td>
              <td>{service.duration} min</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    </section>
  );
}

export default AdminServices;
