import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTimeSheet, editTimeSheet } from '../../../../redux/timeSheets/thunks';
import styles from './FormTimeSheet.module.css';
import Button from '../../../Shared/Buttons/Buttons';
import Input from '../../../Shared/Field/Input';

const FormTimeSheet = ({
  showForm,
  setShowForm,
  setShowModal,
  setChildrenModal,
  previousTimeSheet,
  setPreviousTimeSheet
}) => {
  if (!showForm) {
    return null;
  }
  const dispatch = useDispatch();
  const [listEmployees, setListEmployees] = useState([]);
  const [listProjects, setListProjects] = useState([]);
  const [listTasks, setListTasks] = useState([]);
  const [employee, setEmployee] = useState(previousTimeSheet.employee);
  const [project, setProject] = useState(previousTimeSheet.project);
  const [task, setTask] = useState(previousTimeSheet.task);
  const [hsWorked, setHSWorked] = useState(previousTimeSheet.hs_worked);
  const [date, setDate] = useState(previousTimeSheet.date);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setListEmployees(...listEmployees, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const employeeName = listEmployees.map((item) => {
    if (item._id == employee) {
      return item.first_name;
    }
  });

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setListProjects(...listProjects, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const projectName = listProjects.map((item) => {
    if (item._id == project) {
      return item.project_name;
    }
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setListTasks(...listTasks, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskDescription = listTasks.map((item) => {
    if (item._id == task) {
      return item.description;
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const newTimeSheet = {
      _id: previousTimeSheet._id,
      employee: {
        _id: employee,
        first_name: employeeName
      },
      project: {
        _id: project,
        project_name: projectName
      },
      task: {
        _id: task,
        description: taskDescription
      },
      hs_worked: hsWorked,
      timesheetDate: date
    };

    if (!previousTimeSheet._id) {
      try {
        const timeSheetResponse = await dispatch(addTimeSheet(newTimeSheet));
        if (timeSheetResponse.error) {
          setChildrenModal(timeSheetResponse.message);
          setShowModal(true);
        } else {
          setChildrenModal(timeSheetResponse.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const timeSheetResponse = await dispatch(editTimeSheet(newTimeSheet));
        if (timeSheetResponse.error) {
          setChildrenModal(timeSheetResponse.message);
          setShowModal(true);
        } else {
          setChildrenModal(timeSheetResponse.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const closeForm = () => {
    setPreviousTimeSheet({
      _id: '',
      employee: '',
      hs_worked: 0,
      task: '',
      project: '',
      timesheetDate: ''
    });
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Edit time-sheet</h2>
        <div>
          <Input
            type={'select'}
            name={'employee'}
            onChange={(e) => setEmployee(e.target.value)}
            valueOptions={listEmployees}
            value={employee}
            label={'Select an Employee'}
          ></Input>
        </div>
        <div>
          <Input
            type={'select'}
            name={'project'}
            onChange={(e) => setProject(e.target.value)}
            valueOptions={listProjects}
            label={'Select a Project'}
            value={project}
          ></Input>
        </div>
        <div>
          <Input
            type={'select'}
            name={'task'}
            onChange={(e) => setTask(e.target.value)}
            valueOptions={listTasks}
            label={'Select a Task'}
            value={task}
          ></Input>
        </div>
        <div>
          <Input
            type="number"
            name="hs_worked"
            value={hsWorked}
            onChange={(e) => setHSWorked(e.target.value)}
            label={'Worked Hours'}
          ></Input>
        </div>
        <div>
          <Input
            type="date"
            name="timesheetDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label={'DATE'}
          ></Input>
        </div>
        <div className={styles.button}>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default FormTimeSheet;