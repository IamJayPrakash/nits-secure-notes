router.use(authMiddleware);

router.get("/", getNotes);

router.get("/:id", getSingleNote);

router.post(
  "/",
  noteValidation,
  validate,
  createNote
);

router.put(
  "/:id",
  noteValidation,
  validate,
  updateNote
);

router.delete("/:id", deleteNote);