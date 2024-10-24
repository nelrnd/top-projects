export default function TextArea({ placeholder = "", label, value, onChange }) {
  const id = crypto.randomUUID()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></textarea>
    </div>
  )
}
