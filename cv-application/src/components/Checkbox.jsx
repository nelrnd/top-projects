export default function Checkbox({ label, value, onChange }) {
  const id = crypto.randomUUID()
  return (
    <div>
      <input type="checkbox" id={id} value={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
