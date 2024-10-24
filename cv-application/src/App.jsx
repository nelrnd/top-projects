import { useState } from "react"
import Input from "./components/Input"
import TextArea from "./components/TextArea"
import Checkbox from "./components/Checkbox"
import "./styles/app.css"
import { createPortal } from "react-dom"

const generalTemplate = {
  fullName: "",
  address: "",
  email: "",
  phone: "",
  role: "",
  about: "",
}

const educationTemplate = {
  schoolName: "",
  titleOfStudy: "",
  startYear: "",
  endYear: "",
  current: false,
}

const experienceTemplate = {
  companyName: "",
  positionTitle: "",
  responsabilities: "",
  startYear: "",
  endYear: "",
  current: false,
}

export default function App() {
  const [editMode, setEditMode] = useState(true)

  const [general, setGeneral] = useState({
    ...generalTemplate,
  })
  const [educationList, setEducationList] = useState([
    { ...educationTemplate, id: crypto.randomUUID() },
  ])
  const [experienceList, setExperienceList] = useState([
    { ...experienceTemplate, id: crypto.randomUUID() },
  ])

  return (
    <div>
      <h1>CV Builder</h1>
      {editMode ? (
        <Form
          handlePreview={() => setEditMode(false)}
          general={general}
          setGeneral={setGeneral}
          educationList={educationList}
          setEducationList={setEducationList}
          experienceList={experienceList}
          setExperienceList={setExperienceList}
        />
      ) : (
        <Preview
          handleEdit={() => setEditMode(true)}
          general={general}
          educationList={educationList}
          experienceList={experienceList}
        />
      )}
    </div>
  )
}

function Form({
  handlePreview,
  general,
  setGeneral,
  educationList,
  setEducationList,
  experienceList,
  setExperienceList,
}) {
  return (
    <>
      <header>
        <h2>Edit CV</h2>
        <button onClick={handlePreview}>Preview CV</button>
      </header>
      <GeneralForm general={general} setGeneral={setGeneral} />
      <EducationForm
        educationList={educationList}
        setEducationList={setEducationList}
      />
      <ExperienceForm
        experienceList={experienceList}
        setExperienceList={setExperienceList}
      />
    </>
  )
}

function GeneralForm({ general, setGeneral }) {
  function handleChange(event, prop) {
    setGeneral({ ...general, [prop]: event.target.value })
  }

  return (
    <section>
      <h3>General</h3>
      <Input
        label="Full name"
        value={general.fullName}
        onChange={(e) => handleChange(e, "fullName")}
      />
      <Input
        label="Address"
        value={general.address}
        onChange={(e) => handleChange(e, "address")}
      />
      <Input
        type="email"
        label="Email"
        value={general.email}
        onChange={(e) => handleChange(e, "email")}
      />
      <Input
        type="tel"
        label="Phone number"
        value={general.phone}
        onChange={(e) => handleChange(e, "phone")}
      />
      <Input
        label="Role"
        value={general.role}
        onChange={(e) => handleChange(e, "role")}
      />
      <TextArea
        label="About me"
        value={general.about}
        onChange={(e) => handleChange(e, "about")}
      />
    </section>
  )
}

function EducationForm({ educationList, setEducationList }) {
  function handleChange(id, prop, value) {
    setEducationList(
      educationList.map((education) =>
        education.id === id ? { ...education, [prop]: value } : education
      )
    )
  }

  return (
    <section>
      <h3>Education</h3>
      {educationList.map((education) => (
        <EducationItem
          key={education.id}
          education={education}
          onChange={handleChange}
        />
      ))}
    </section>
  )
}

function EducationItem({ education, onChange }) {
  function handleChange(event, prop) {
    onChange(education.id, prop, event.target.value)
  }

  function handleCheck(event, prop) {
    onChange(education.id, prop, event.target.checked)
  }

  return (
    <section>
      <Input
        label="School name"
        value={education.schoolName}
        onChange={(e) => handleChange(e, "schoolName")}
      />
      <Input
        label="Title of study"
        value={education.titleOfStudy}
        onChange={(e) => handleChange(e, "titleOfStudy")}
      />
      <Input
        type="number"
        label="Start year"
        value={education.startYear}
        onChange={(e) => handleChange(e, "startYear")}
      />
      {education.current === false && (
        <Input
          type="number"
          label="End year"
          value={education.endYear}
          onChange={(e) => handleChange(e, "endYear")}
        />
      )}
      <Checkbox
        label="I still study here"
        value={education.current}
        onChange={(e) => handleCheck(e, "current")}
      />
    </section>
  )
}

function ExperienceForm({ experienceList, setExperienceList }) {
  function handleChange(id, prop, value) {
    setExperienceList(
      experienceList.map((experience) =>
        experience.id === id ? { ...experience, [prop]: value } : experience
      )
    )
  }

  return (
    <section>
      <h3>Work experience</h3>
      {experienceList.map((experience) => (
        <ExperienceItem
          key={experience.id}
          experience={experience}
          onChange={handleChange}
        />
      ))}
    </section>
  )
}

function ExperienceItem({ experience, onChange }) {
  function handleChange(event, prop) {
    onChange(experience.id, prop, event.target.value)
  }

  function handleCheck(event, prop) {
    onChange(experience.id, prop, event.target.checked)
  }

  return (
    <section>
      <Input
        label="Company name"
        value={experience.companyName}
        onChange={(e) => handleChange(e, "companyName")}
      />
      <Input
        label="Position title"
        value={experience.positionTitle}
        onChange={(e) => handleChange(e, "positionTitle")}
      />
      <TextArea
        label="Main responsabilities (comma separated)"
        value={experience.responsabilities}
        onChange={(e) => handleChange(e, "responsabilities")}
      />
      <Input
        type="number"
        label="Start year"
        value={experience.startYear}
        onChange={(e) => handleChange(e, "startYear")}
      />
      {experience.current === false && (
        <Input
          type="number"
          label="End year"
          value={experience.end}
          onChange={(e) => handleChange(e, "endYear")}
        />
      )}
      <Checkbox
        label="I still work here"
        value={experience.current}
        onChange={(e) => handleCheck(e, "current")}
      />
    </section>
  )
}

function Preview({ handleEdit, general, educationList, experienceList }) {
  const contactInfos = [general.address, general.email, general.phone]

  return (
    <>
      <header>
        <h2>Preview CV</h2>
        <button onClick={handleEdit}>Back to edit</button>
      </header>
      <main>
        <div>{general.fullName}</div>
        <div>{general.role}</div>
        <div>{general.about}</div>

        {contactInfos.length > 0 && (
          <ul>
            {contactInfos.map((info, id) => (
              <li key={id}>{info}</li>
            ))}
          </ul>
        )}

        <section>
          <h3>Education</h3>
          {educationList.map((education) => (
            <article key={education.id}>
              <div>
                {education.startYear} -{" "}
                {education.current ? "CURRENT" : education.endYear}
              </div>
              <h4>
                {education.titleOfStudy} at {education.schoolName}
              </h4>
            </article>
          ))}
        </section>
        <section>
          <h3>Work experience</h3>
          {experienceList.map((experience) => (
            <article key={experience.id}>
              <div>
                {experience.startYear} -{" "}
                {experience.current ? "CURRENT" : experience.endYear}
              </div>
              <h4>
                {experience.positionTitle} at {experience.companyName}
              </h4>
              <ul>
                {experience.responsabilities
                  .split(",")
                  .filter((responsability) => responsability)
                  .map((responsability, id) => (
                    <li key={id}>{responsability}</li>
                  ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}
