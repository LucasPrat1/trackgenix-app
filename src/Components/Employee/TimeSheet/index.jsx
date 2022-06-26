import React, { useEffect, useState } from 'react';
import styles from 'Components/Employee/TimeSheet/timesheets.module.css';
import Table from 'Components/Shared/Table/Table';
import Modal from 'Components/Shared/Modal/Modal';
import Form from 'Components/Employee/TimeSheet/Form/Form';
import Button from 'Components/Shared/Buttons/Buttons';
import Loader from 'Components/Shared/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheet } from 'redux/timeSheets/thunks';

const TimeSheet = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.timeSheet.isLoading);

  const employeeId = '629d41966737e327d3189242';

  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [previousTimeSheet, setPreviousTimeSheet] = useState({
    _id: '',
    employee: employeeId,
    hs_worked: 0,
    task: '',
    project: '',
    timesheetDate: ''
  });

  useEffect(() => {
    dispatch(getTimeSheet());
  }, []);

  const listTimeSheet = useSelector((state) => state.timeSheet.list);

  const filteredListTimeSheet = listTimeSheet.filter(
    (timeSheet) => timeSheet.employee?._id == employeeId
  );

  const newList = filteredListTimeSheet.map((item) => {
    return {
      _id: item._id,
      employee: item.employee ? item.employee.first_name : '',
      hs_worked: item.hs_worked,
      task: item.task ? item.task.description : '',
      project: item.project ? item.project.project_name : '',
      timesheetDate: item.timesheetDate.slice(0, 10)
    };
  });

  const deleteItem = () => {
    setShowModal(true);
    setChildrenModal('You cannot delete a time-sheet');
  };

  const handleEdit = (timeSheet) => {
    setPreviousTimeSheet({
      _id: timeSheet._id,
      employee: employeeId,
      hs_worked: timeSheet.hs_worked,
      task: timeSheet.task,
      project: timeSheet.project,
      timesheetDate: timeSheet.timesheetDate
    });
    setShowForm(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <section className={styles.container}>
          <Table
            title={`${newList[0] ? newList[0].employee : ''}'s Time-Sheet`}
            data={newList}
            headersColumns={['ID', 'Employee', 'Hours Worked', 'Project', 'Task', 'Date']}
            headers={['_id', 'employee', 'hs_worked', 'project', 'task', 'timesheetDate']}
            deleteItem={deleteItem}
            editItem={handleEdit}
          />
          <Form
            showForm={showForm}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            previousTimeSheet={previousTimeSheet}
            setPreviousTimeSheet={setPreviousTimeSheet}
          />
          <Button onClick={() => setShowForm(true)}>Add a TimeSheets</Button>
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
            {childrenModal}
          </Modal>
        </section>
      )}
      ;
    </>
  );
};

export default TimeSheet;
