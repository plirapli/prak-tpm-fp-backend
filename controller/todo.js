const connection = require("../config/connection");

const getTodo = async (req, res) => {
  try {
    const { user_id } = req.decoded;
    const command = "SELECT * FROM todo WHERE user_id = ?";
    const [[data]] = await connection.promise().query(command, [user_id]);

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved the todo list by id",
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
      "INSERT INTO todos (title, description, is_completed, user_id) VALUES (?, ?, 0, ?)";
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
    const { username } = req.params;
    const { title, description, img } = req.body;

    if (!title || !description || !img) {
      const msg = `${
        !title ? "Title" : !description ? "Description" : "Image"
      } field cannot be empty 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    const command = `UPDATE todos SET title = ?, description = ?, image WHERE id = ?`;
    await connection.promise().query(command, [title, isi, id]);

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

const deleteTodo = async (req, res) => {
  try {
    // mengambil id dari parameter endpoint
    const { id } = req.params;

    // execute query ke database
    const command = `DELETE FROM todos WHERE id=?`;
    await connection.promise().query(command, [id]);

    // mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus todo",
    });
  } catch (err) {
    // mengirimkan respons jika gagal
    res.status(err.statusCode || 500).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = { getTodo, insertTodo, updateTodo, checkTodo, deleteTodo };
