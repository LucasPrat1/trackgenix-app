import React from 'react';
import Table from 'Components/Shared/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import { softDelete } from 'redux/projects/thunks';
import styles from './list.module.css';

const List = ({ setShowForm, setPreviousProject, setShowModal, setTitleModal }) => {
  const dispatch = useDispatch();

  const listProjects = useSelector((state) => state.projects.list);

  const sortedProjects = listProjects
    .filter((project) => project.active == true)
    .concat(listProjects.filter((project) => project.active == false));

  const newListProject = sortedProjects.map((item) => {
    return {
      ...item,
      start_date: item.start_date.slice(0, 10),
      finish_date: item.finish_date.slice(0, 10)
    };
  });

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to remove this Project?')) {
      const responseProject = dispatch(softDelete(id));
      if (!responseProject.error) {
        setTitleModal('Project deleted successfully');
        setShowModal(true);
      }
    }
  };

  const handleEdit = (project) => {
    setPreviousProject(project);
    setShowForm(true);
  };

  const viewEmployees = (project) => {
    setTitleModal(
      <table className={styles.table}>
        <thead>
          <tr>
            {['First Name', 'Last Name', 'Role', 'Rate'].map((headersColumns, index) => {
              return <th key={index}>{headersColumns}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {project.employees.map((employee) => {
            return (
              <tr className={styles.tr} key={employee.id._id}>
                <td>{employee.id.first_name}</td>
                <td>{employee.id.last_name}</td>
                <td>{employee.role}</td>
                <td>{employee.rate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
    setShowModal(true);
  };

  return (
    <Table
      title={'Projects'}
      data={newListProject}
      headersColumns={['Project Name', 'Client', 'Start Date', 'Finish Date']}
      headers={['project_name', 'client', 'start_date', 'finish_date']}
      deleteItem={handleDelete}
      editItem={handleEdit}
      viewMore={viewEmployees}
    />
  );
};

export default List;
