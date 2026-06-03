exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createTask = (req, res) => {
  res.send("Create Task working");
};
exports.createTask = (req, res) => {};
exports.getTasks = (req, res) => {};
exports.updateTask = (req, res) => {};
exports.deleteTask = (req, res) => {};