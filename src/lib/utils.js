export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function normalizeDocument(doc) {
  if (!doc) return null;
  const json = JSON.parse(JSON.stringify(doc));
  json.id = json._id?.toString?.() ?? json._id;
  delete json._id;
  delete json.__v;
  return json;
}
