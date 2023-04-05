import * as React from 'react'
import { useEffect } from "react"
import API, { endpoints } from "../configs/API"
import { useState } from "react"
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const Projects = () => {
    const[project, setProject] = useState([])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name_project', headerName: 'Project name', width: 130 },
        { field: 'target', headerName: 'Target', type: 'number', width: 130 },
        { field: 'income_amount', headerName: 'Income', type: 'number', width: 90 },
        { field: 'spending_amount', headerName: 'Spending', type: 'number', width: 160 }
        //   valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];

    useEffect(() => {
        const loadProjects = async () => {
            let res = await API.get(endpoints['projects'])
            console.log(res.data.results)
            setProject(res.data.results)
        }

        loadProjects()
    }, [])

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={project}
                    columns={columns}
                    checkboxSelection />
            </div>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

            <List>
                <ListItem key='group' style={{ marginTop: '20px', marginBottom: '20px' }}>
                    {project.map(p => <h3 key={p.id}>{p.name_project}</h3>)}
                </ListItem>
            </List>

      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
            <ul>{project.map(p => <li key={p.id}>{p.name_project}</li>)}</ul>
        </>
    )
}

export default Projects
