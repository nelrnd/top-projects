export default function Input({
  type = "text",
  placeholder = "",
  label,
  value,
  onChange,
}) {
  const id = crypto.randomUUID()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
