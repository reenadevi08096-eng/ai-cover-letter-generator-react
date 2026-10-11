import { useState } from "react";
import { generateCoverLetter } from "../gemini";

function CoverLetterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    jobRole: "",
    companyName: "",
    skills: "",
  });

  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false); // Loading state added

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button during request

    const prompt = `
Write a professional cover letter for a job application.

Name: ${formData.fullName}
Job Role: ${formData.jobRole}
Company Name: ${formData.companyName}
Skills: ${formData.skills}

Instructions:
1. Do NOT include bracketed placeholders like [Your Address], [City, State], [Date], or [Company Address] at the top or bottom.
2. Start directly with a formal greeting to the Hiring Manager or Team at ${formData.companyName}.
3. Write 3 concise, impactful paragraphs demonstrating enthusiasm and relevant skills in ${formData.skills}.
4. End with a professional sign-off using the name: ${formData.fullName}.
`;

    try {
      const result = await generateCoverLetter(prompt);
      setCoverLetter(result);
    } catch (error) {
      console.error("FULL ERROR:", error);
      alert("Something went wrong. Check Console.");
    } finally {
      setLoading(false); // Enable button back after completion
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Generate Cover Letter</h2>

        <label>Full Name</label>
        <input
          name="fullName"
          type="text"
          placeholder="Enter your Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Job Role</label>
        <input
          name="jobRole"
          type="text"
          placeholder="Enter your Job Role"
          value={formData.jobRole}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Company Name</label>
        <input
          name="companyName"
          type="text"
          placeholder="Enter Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Skills</label>
        <input
          name="skills"
          type="text"
          placeholder="Enter Your Skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </form>

      {coverLetter && (
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#1f2937",
            padding: "28px",
            marginTop: "24px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            textAlign: "left",
            whiteSpace: "pre-wrap",
            lineHeight: "1.7",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            maxWidth: "700px",
            margin: "24px auto 0 auto",
            fontFamily: "sans-serif",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "16px",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "8px",
              color: "#111827",
            }}
          >
            Your Cover Letter
          </h2>
          <div style={{ fontSize: "15px" }}>{coverLetter}</div>
        </div>
      )}
    </>
  );
}

export default CoverLetterForm;