const connection = require("../config/connection");

const getTodo = async (req, res) => {
  try {
    const { id } = req.decoded;
    const command =
      "SELECT id, title, description, is_completed, color, updated_at, created_at FROM todos WHERE user_id = ?";
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

const getTodoById = async (req, res) => {
  try {
    const { id } = req.decoded;
    const { todo_id } = req.params;
    const command =
      "SELECT id, title, description, is_completed, color, updated_at, created_at FROM todos WHERE user_id = ? AND id = ?";
    const [[data]] = await connection.promise().query(command, [id, todo_id]);

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
    const { title, desc, color } = req.body;

    if (!title || !desc) {
      const msg = `${
        !title ? "Title" : "Description"
      } field cannot be empty 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }
    const command =
      "INSERT INTO todos (title, description, color, user_id) VALUES (?, ?, ?, ?)";
    await connection.promise().query(command, [title, desc, color, id]);

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
    const { todo_id } = req.params;
    const { id } = req.decoded;
    const { is_completed } = req.body;
    if (!is_completed) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 401;
      throw error;
    }
    const command = `UPDATE todos SET is_completed=? WHERE user_id=? AND id=?`;
    await connection.promise().query(command, [is_completed, id, todo_id]);

    res.status(200).json({
      status: "Success",
      message: is_completed == 1 ? "Todo checked" : "Todo unchecked",
    });
  } catch (err) {
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
    const { title, desc, color } = req.body;
    const img = req.file?.img;

    if (!title || !desc || !color) {
      const msg = `${
        !title ? "Title" : !desc ? "Description" : "Color"
      } field cannot be empty 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }
    const command = `UPDATE todos SET title=?, description=?, color=? WHERE user_id=? AND id=?`;
    await connection
      .promise()
      .query(command, [title, desc, color, id, todo_id]);

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
      message: "Todo deleted",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  getTodo,
  getTodoById,
  insertTodo,
  updateTodo,
  checkTodo,
  deleteTodo,
};
