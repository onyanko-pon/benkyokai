const express = require('express');
const router = express.Router();

const Event = require('../../models/Event')
const Workspace = require('../../models/Workspace')

router.get("/:workspaceId/events", async (req, res) => {

  const {workspaceId} = req.params

  Workspace.findByPk(workspaceId)
    .then(async (workspace) => {
      if (workspace === null) {
        res.status(404).json({message: "workspace not found"})
        return
      }
      const events = await Event.findAll({
        where: {workspaceId}
      })
      res.status(200).json({workspace, events})
    })
    .catch(error => {
      res.status(500).json({error})
    })
})

module.exports = router;
