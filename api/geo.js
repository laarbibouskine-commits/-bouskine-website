// Renvoie le pays du visiteur (fourni par Vercel) pour choisir la langue du site.
module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ country: req.headers["x-vercel-ip-country"] || null });
};
