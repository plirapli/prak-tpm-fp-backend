const connection = require("../config/connection");

const getTodo = async (req, res) => {
  try {
    const { id } = req.decoded;
    const command =
      "SELECT id, title, description, is_completed, created_at FROM todos WHERE user_id = ?";
    const [data] = await connection.promise().query(command, [id]);

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved todo list by id",
      data: data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const insertTodo = async (req, res) => {
  try {
    const { id } = req.decoded;
    const { title, desc } = req.body;

    if (!title || !desc) {
      const msg = `${
        !title ? "Title" : "Description"
      } field cannot be empty 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    const command =
      "INSERT INTO todos (title, description, user_id) VALUES (?, ?, ?)";
    await connection.promise().query(command, [title, desc, id]);

    res.status(201).json({
      status: "Success",
      message: "Todo added to list",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const checkTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const command = `UPDATE todos SET is_completed = ? WHERE id = ?`;
    await connection.promise().query(command, [1, id]);

    res.status(200).json({
      status: "Success",
      message: "Todo updated",
    });
  } catch (err) {
    // mengirimkan respons jika gagal
    res.status(err.statusCode || 500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { id } = req.decoded;
    const { title, desc, img } = req.body;

    if (!title || !description || !img) {
      const msg = `${
        !title ? "Title" : !description ? "Description" : "Image"
      } field cannot be empty 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    const command = `UPDATE todos SET title=?, description=?, image WHERE user_id=? AND id=?`;
    await connection.promise().query(command, [title, desc, img, id, todo_id]);

    res.status(200).json({
      status: "Success",
      message: "Todo updated",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { id } = req.decoded;
    const command = `DELETE FROM todos WHERE user_id=? AND id=?`;
    await connection.promise().query(command, [id, todo_id]);

    res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus todo",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = { getTodo, insertTodo, updateTodo, checkTodo, deleteTodo };
