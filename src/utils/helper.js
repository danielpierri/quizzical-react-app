export default function decodeHtml(html) {
  let text = document.createElement("textarea")
  text.innerHTML = html
  return text.value
}