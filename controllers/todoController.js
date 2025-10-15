const pool = require("../config/database");

const getAllTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10, is_done } = req.query;
    const offset = (page - 1) * limit;
    const userId = req.user.id;

    let query = "SELECT * FROM todos WHERE user_id = $1";
    let queryParams = [userId];
    let paramCount = 1;

    // Jika ada todo selesai
    if (is_done !== undefined) {
      paramCount++;
      query += ` AND is_done = $${paramCount}`;
      queryParams.push(is_done === "true");
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${
      paramCount + 2
    }`;
    queryParams.push(parseInt(limit), offset);

    const result = await pool.query(query, queryParams);

    // Pagination
    let countQuery = "SELECT COUNT(*) FROM todos WHERE user_id = $1";
    let countParams = [userId];
    let countParamCount = 1;

    if (is_done !== undefined) {
      countParamCount++;
      countQuery += ` AND is_done = $${countParamCount}`;
      countParams.push(is_done === "true");
    }

    const countResult = await pool.query(countQuery, countParams);
    const totalTodos = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalTodos / limit);

    res.json({
      success: true,
      data: {
        todos: result.rows,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: totalTodos,
          items_per_page: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching todos",
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM todos WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      data: {
        todo: result.rows[0],
      },
    });
  } catch (error) {
    console.error("Get todo error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching todo",
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, is_done = false } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      "INSERT INTO todos (title, description, is_done, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, is_done, userId]
    );

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: {
        todo: result.rows[0],
      },
    });
  } catch (error) {
    console.error("Create todo error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while creating todo",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_done } = req.body;
    const userId = req.user.id;

    const existingTodo = await pool.query(
      "SELECT * FROM todos WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (existingTodo.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    const updateFields = [];
    const updateValues = [];
    let paramCount = 0;

    if (title !== undefined) {
      paramCount++;
      updateFields.push(`title = $${paramCount}`);
      updateValues.push(title);
    }

    if (description !== undefined) {
      paramCount++;
      updateFields.push(`description = $${paramCount}`);
      updateValues.push(description);
    }

    if (is_done !== undefined) {
      paramCount++;
      updateFields.push(`is_done = $${paramCount}`);
      updateValues.push(is_done);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    paramCount++;
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id, userId);

    const query = `UPDATE todos SET ${updateFields.join(
      ", "
    )} WHERE id = $${paramCount} AND user_id = $${paramCount + 1} RETURNING *`;

    const result = await pool.query(query, updateValues);

    res.json({
      success: true,
      message: "Todo updated successfully",
      data: {
        todo: result.rows[0],
      },
    });
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating todo",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: "Todo deleted successfully",
      data: {
        deleted_todo: result.rows[0],
      },
    });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting todo",
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
