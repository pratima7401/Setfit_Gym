import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  FiLogOut,
  FiUsers,
  FiGrid,
  FiEdit,
  FiTrash,
  FiUserCheck,
  FiPlus,
  FiCreditCard,
  FiBarChart2,
} from "react-icons/fi";

function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [editMember, setEditMember] = useState(null);
  const [editTrainer, setEditTrainer] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    phone: "",
    specialty: "",
    experience: "",
    image: null,
  });
  const [showTrainerForm, setShowTrainerForm] = useState(false);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [editPlan, setEditPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    name: "",
    premiumLabel: "", // ✅ Ensure this matches your DB field
    price: "",
    duration: "",
    features: "", // ✅ Ensure this is included
  });
  const [transformationPlans, setTransformationPlans] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editTransformationPlan, setEditTransformationPlan] = useState(null);
  const [newTransformationPlan, setNewTransformationPlan] = useState({
    name: "",
    goal: "",
    duration: "",
    details: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetchMembershipPlans();
    fetchTransformationPlans();
  }, []);

  useEffect(() => {
    if (activeTab === "members" && members.length === 0) fetchMembers();
    if (activeTab === "trainers" && trainers.length === 0) fetchTrainers();
    if (activeTab === "membershipPlans") fetchMembershipPlans();
    if (activeTab === "transformationPlans") fetchTransformationPlans();
  }, [activeTab]);

  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost/gym_api/members.php");
      const data = await response.json();
      setMembers(data.members || []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]); // Fallback to empty array
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const handleEditMember = (member) => {
    setEditMember(member);
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost/gym_api/members.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editMember),
      });

      if (response.ok) {
        fetchMembers();
        setEditMember(null);
      } else {
        console.error("Failed to update member.");
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const response = await fetch(
        `http://localhost/gym_api/members.php?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMembers(members.filter((member) => member.id !== id));
      } else {
        console.error("Failed to delete member.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleEditTrainer = (trainer) => {
    setEditTrainer(trainer);
  };

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();

    try {
      console.log("Updating Trainer:", editTrainer);

      const response = await fetch(
        "http://localhost/gym_api/trainers.php?action=update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editTrainer),
        }
      );

      const data = await response.text(); // Log raw response
      console.log("Raw Response:", data);

      const jsonData = JSON.parse(data);
      console.log("Parsed Response:", jsonData);

      if (jsonData.success) {
        alert("Trainer updated successfully!");
      } else {
        alert("Update failed: " + jsonData.error);
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trainer?"))
      return;

    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await fetch(
        "http://localhost/gym_api/trainers.php?action=delete",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Trainer deleted successfully!");
        fetchTrainers(); // Refresh trainers list after deletion
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch(
        "http://localhost/gym_api/trainers.php?action=get"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTrainers([...data.trainers]);
      setTimestamp(Date.now()); // ✅ Force state update
    } catch (error) {
      console.error("Error fetching trainers:", error);
      setTrainers([]);
    }
  };
  useEffect(() => {
    fetchTrainers();
  }, [timestamp]);

  const handleTrainerSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newTrainer.name);
    formData.append("phone", newTrainer.phone);
    formData.append("specialty", newTrainer.specialty);
    formData.append("experience", newTrainer.experience);
    formData.append(
      "certifications",
      JSON.stringify(newTrainer.certifications)
    );
    if (newTrainer.image) {
      formData.append("image", newTrainer.image);
    }

    try {
      const response = await fetch(
        "http://localhost/gym_api/trainers.php?action=add",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Trainer added successfully!");
        setShowTrainerForm(false);
        setNewTrainer({
          name: "",
          phone: "",
          specialty: "",
          experience: "",
          certifications: [],
          image: null,
        });

        fetchTrainers(); // Fetch updated trainers list
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error adding trainer:", error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);


// ✅ Fetch Plans Based on Active Tab
useEffect(() => {
  if (activeTab === "membershipPlans") fetchMembershipPlans();
  if (activeTab === "transformationPlans") fetchTransformationPlans();
}, [activeTab]);

// ✅ Fetch Membership Plans
const fetchMembershipPlans = async () => {
  try {
    const response = await fetch("http://localhost/gym_api/membership_plan.php?action=get");
    const data = await response.json();
    setMembershipPlans(data.plans || []);
  } catch (error) {
    console.error("Error fetching membership plans:", error);
  }
};

// ✅ Fetch Transformation Plans
const fetchTransformationPlans = async () => {
  try {
    const response = await fetch("http://localhost/gym_api/transformation_plan.php?action=get");
    const data = await response.json();
    setTransformationPlans(data.plans || []);
  } catch (error) {
    console.error("Error fetching transformation plans:", error);
  }
};

// ✅ Handle Image Upload
const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost/gym_api/upload_image.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) return data.image_url;
    else throw new Error("Image upload failed");
  } catch (error) {
    console.error("Error uploading image:", error);
    return "";
  }
};

// ✅ Handle Adding Plans (Both Membership & Transformation)
const handleAddPlan = async (e) => {
  e.preventDefault();
  let imageUrl = "";

  if (selectedFile) {
    imageUrl = await handleImageUpload(selectedFile);
    if (!imageUrl) return alert("Failed to upload image.");
  }

  const planData = { ...newPlan, image_url: imageUrl };
  const url = activeTab === "membershipPlans"
    ? "http://localhost/gym_api/membership_plan.php?action=add"
    : "http://localhost/gym_api/transformation_plan.php?action=add";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(planData),
    });

    const data = await response.json();
    if (data.success) {
      alert(`${activeTab === "membershipPlans" ? "Membership" : "Transformation"} plan added successfully!`);
      activeTab === "membershipPlans" ? fetchMembershipPlans() : fetchTransformationPlans();
      setShowAddForm(false);
      setNewPlan({ name: "", price: "", duration: "", features: "", image_url: "" });
      setSelectedFile(null);
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    console.error("Error adding plan:", error);
  }
};

// ✅ Handle Updating Plans (Both Membership & Transformation)
const handleUpdatePlan = async (e) => {
  e.preventDefault();
  if (!editPlan?.id) return alert("Error: Missing plan ID!");

  let imageUrl = editPlan.image_url;
  if (selectedFile) {
    imageUrl = await handleImageUpload(selectedFile);
    if (!imageUrl) return alert("Failed to upload image.");
  }

  const updatedPlan = { ...editPlan, image_url: imageUrl };
  const url = activeTab === "membershipPlans"
    ? "http://localhost/gym_api/membership_plan.php?action=update"
    : "http://localhost/gym_api/transformation_plan.php?action=update";

  try {
    const response = await fetch(url, {
      method: "POST", // Using POST instead of PUT
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPlan),
    });

    const data = await response.json();
    if (data.success) {
      alert(`${activeTab === "membershipPlans" ? "Membership" : "Transformation"} plan updated successfully!`);
      activeTab === "membershipPlans" ? fetchMembershipPlans() : fetchTransformationPlans();
      setEditPlan(null);
      setSelectedFile(null);
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    console.error("Error updating plan:", error);
  }
};

// ✅ Handle Deleting Plans (Both Membership & Transformation)
const handleDeletePlan = async (id) => {
  if (!window.confirm(`Are you sure you want to delete this ${activeTab === "membershipPlans" ? "Membership" : "Transformation"} plan?`)) return;

  const url = activeTab === "membershipPlans"
    ? `http://localhost/gym_api/membership_plan.php?action=delete&id=${id}`
    : `http://localhost/gym_api/transformation_plan.php?action=delete&id=${id}`;

  try {
    const response = await fetch(url, { method: "DELETE" });
    const data = await response.json();
    if (data.success) {
      alert(`${activeTab === "membershipPlans" ? "Membership" : "Transformation"} plan deleted successfully!`);
      activeTab === "membershipPlans" ? fetchMembershipPlans() : fetchTransformationPlans();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Error deleting plan:", error);
  }
};


  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 h-screen bg-gray-900 text-white p-5 fixed top-0 left-0">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="space-y-4">
          {[
            { name: "Dashboard", icon: <FiGrid />, tab: "dashboard" },
            { name: "Members", icon: <FiUsers />, tab: "members" },
            { name: "Trainers", icon: <FiUserCheck />, tab: "trainers" },
            {
              name: "Membership Plans",
              icon: <FiCreditCard />,
              tab: "membershipPlans",
            },
            {
              name: "Transformation Plans",
              icon: <FiBarChart2 />,
              tab: "transformationPlans",
            },
          ].map(({ name, icon, tab }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center space-x-2 p-2 rounded-lg w-full ${
                activeTab === tab ? "bg-purple-600" : "hover:bg-gray-700"
              }`}
            >
              {icon}
              <span>{name}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <Button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 bg-red-500 hover:bg-red-600 p-2 rounded-lg"
          >
            <FiLogOut />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6 bg-gray-100 min-h-screen ml-64">
        {activeTab === "members" && (
          <div className="bg-purple-500 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Registered Members</h2>
            <input
              type="text"
              placeholder="Search by ID or Name"
              className="border text-gray-600 p-2 rounded w-full mb-4"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Phone</th>
                  <th className="border p-3">Purpose</th>
                  <th className="border p-3">Medical Details</th>
                  <th className="border p-3">Joining Date</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(members) && members.length > 0 ? (
                  members.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b bg-gray-900 text-gray-200"
                    >
                      <td className="border p-3">{member.id}</td>
                      <td className="border p-3">{member.name}</td>
                      <td className="border p-3">{member.phone}</td>
                      <td className="border p-3">{member.purpose}</td>
                      <td className="border p-3">{member.medicalDetails}</td>
                      <td className="border p-3">{member.created_at}</td>
                      <td className="border p-3 flex gap-2">
                        <button
                          className="bg-blue-500 p-2 rounded"
                          onClick={() => handleEditMember(member)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <FiTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Modal for Editing Members */}
        {editMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg text-black font-bold mb-4">Edit Member</h2>
              <form onSubmit={handleUpdateMember}>
                <input
                  type="text"
                  value={editMember.name}
                  onChange={(e) =>
                    setEditMember({ ...editMember, name: e.target.value })
                  }
                  className="border p-2 text-black w-full mb-4"
                />
                <input
                  type="text"
                  value={editMember.email}
                  onChange={(e) =>
                    setEditMember({ ...editMember, email: e.target.value })
                  }
                  className="border p-2 text-black w-full mb-4"
                />
                <input
                  type="text"
                  value={editMember.phone}
                  onChange={(e) =>
                    setEditMember({ ...editMember, phone: e.target.value })
                  }
                  className="border p-2 text-black w-full mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMember(null)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "trainers" && (
          <div className="bg-purple-500 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Registered Trainers</h2>
            <button
              onClick={() => setShowTrainerForm(true)}
              className="bg-green-500 p-2 rounded text-white flex items-center mb-4"
            >
              <FiPlus className="mr-2" /> Add Trainer
            </button>
            {showTrainerForm && (
              <form
                onSubmit={handleTrainerSubmit}
                className="mb-4 flex flex-col text-black gap-2 bg-gray-200 p-4 rounded"
              >
                <input
                  type="text"
                  placeholder="Trainer Name"
                  value={newTrainer.name}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, name: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={newTrainer.phone}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, phone: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Speciality"
                  value={newTrainer.specialty}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, specialty: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Experience"
                  value={newTrainer.experience}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, experience: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Certification"
                  value={newTrainer.certifications}
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      certifications: e.target.value.split(","),
                    })
                  }
                  className="border p-2 rounded w-full"
                  required
                />

                {/* File Input for Image Upload */}
                <label htmlFor="image" className="text-sm">
                  Trainer Image/
                </label>
                <input
                  type="file"
                  placeholder="image"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, image: e.target.files[0] })
                  }
                  className="border p-2 rounded w-full"
                  required
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 p-2 rounded text-white"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTrainerForm(false)}
                    className="bg-red-500 p-2 rounded text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Image</th>
                  <th className="border p-3">Speciality</th>
                  <th className="border p-3">Experience</th>
                  <th className="border p-3">Certification</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(trainers) && trainers.length > 0 ? (
                  trainers.map((trainer) => (
                    <tr
                      key={trainer.id}
                      className="border-b bg-gray-900 text-gray-200"
                    >
                      <td className="border p-3">{trainer.id}</td>
                      <td className="border p-3">{trainer.name}</td>
                      <td className="border p-3">
                        <img
                          src={`http://localhost/gym_api/uploads//${trainer.image}`}
                          alt="Trainer"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </td>
                      <td className="border p-3">{trainer.specialty}</td>
                      <td className="border p-3">{trainer.experience}</td>
                      <td className="border p-3">{trainer.certifications}</td>
                      <td className="border p-3 flex gap-2">
                        <button
                          className="bg-blue-500 p-2 rounded"
                          onClick={() => handleEditTrainer(trainer)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded"
                          onClick={() => handleDeleteTrainer(trainer.id)}
                        >
                          <FiTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No trainer found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Modal for Editing Trainers */}
        {editTrainer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white text-black p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Edit Trainer</h2>
              <form onSubmit={handleUpdateTrainer}>
                <input
                  type="text"
                  value={editTrainer.name}
                  onChange={(e) =>
                    setEditTrainer({ ...editTrainer, name: e.target.value })
                  }
                  className="border p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={editTrainer.image}
                  onChange={(e) =>
                    setEditTrainer({ ...editTrainer, image: e.target.value })
                  }
                  className="border p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={editTrainer.specialty}
                  onChange={(e) =>
                    setEditTrainer({
                      ...editTrainer,
                      specialty: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={editTrainer.experience}
                  onChange={(e) =>
                    setEditTrainer({
                      ...editTrainer,
                      experience: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-4"
                />
                <input
                  type="text"
                  value={editTrainer.certifications}
                  onChange={(e) =>
                    setEditTrainer({
                      ...editTrainer,
                      certifications: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateTrainer(null)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
 {activeTab === "membershipPlans" && (
          <div className="bg-purple-500 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Membership Plans</h2>

            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search by ID or Name"
                className="border text-gray-600 p-2 rounded w-full mr-2"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => setShowAddForm(true)}
              >
                + Add Plan
              </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Price</th>
                  <th className="border p-3">Duration</th>
                  <th className="border p-3">Features</th>
                  <th className="border p-3">Image</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(membershipPlans) &&
                membershipPlans.length > 0 ? (
                  membershipPlans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="border-b bg-gray-900 text-gray-200"
                    >
                      <td className="border p-3">{plan.id}</td>
                      <td className="border p-3">{plan.name}</td>
                      <td className="border p-3">₹{plan.price}</td>
                      <td className="border p-3">{plan.duration} months</td>
                      <td className="border p-3">{plan.features.join(", ")}</td>
                      <td className="border p-3">
                        <img src={plan.image_url} alt={plan.name} className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td className="border p-3 flex gap-2">
                        <button
                          className="bg-blue-500 p-2 rounded"
                          onClick={() => handleEditPlan(plan)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded"
                          onClick={() => handleDeletePlan(plan.id)}
                        >
                          <FiTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      No membership plans found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Transformation Plans */}
        {activeTab === "transformationPlans" && (
          <div className="bg-purple-500 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Transformation Plans
            </h2>

            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search by ID or Name"
                className="border text-gray-600 p-2 rounded w-full mr-2"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => setShowAddForm(true)}
              >
                + Add Plan
              </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Duration</th>
                  <th className="border p-3">Details</th>
                  <th className="border p-3">Image</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(transformationPlans) &&
                transformationPlans.length > 0 ? (
                  transformationPlans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="border-b bg-gray-900 text-gray-200"
                    >
                      <td className="border p-3">{plan.id}</td>
                      <td className="border p-3">{plan.name}</td>
                      <td className="border p-3">{plan.duration} weeks</td>
                      <td className="border p-3">{plan.details}</td>
                      <td className="border p-3">
                        <img src={plan.image_url} alt={plan.name} className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td className="border p-3 flex gap-2">
                        <button
                          className="bg-blue-500 p-2 rounded"
                          onClick={() => handleEditPlan(plan)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded"
                          onClick={() => handleDeletePlan(plan.id)}
                        >
                          <FiTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      No transformation plans found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;
