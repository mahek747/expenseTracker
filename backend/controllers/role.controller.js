const Role = require("../models/role.model");

const createRole = async (req, res) => {
    const { name, permissions } = req.body;

    if (!name || !permissions) {
        return res.status(400).json({ message: "Name and permissions are required" });
    }

    try {
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }

        const role = await Role.create({ name, permissions });
        return res.status(201).json({ message: "Role created successfully", role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoles = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const role = await Role.findById(id);
            if (!role) {
                return res.status(404).json({ message: "Role not found" });
            }
            return res.status(200).json(role);
        }

        const roles = await Role.find();
        return res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRole = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        if (name) role.name = name;
        if (permissions) role.permissions = permissions;

        await role.save();

        res.status(200).json({ message: "Role updated successfully", role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createRole, getRoles, updateRole, deleteRole };
