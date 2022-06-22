import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeePending,
  deleteEmployeeSuccess,
  deleteEmployeeError,
  addEmployeePending,
  addEmployeeSuccess,
  addEmployeeError,
  editEmployeePending,
  editEmployeeSuccess,
  editEmployeeError
} from './actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const res = await response.json();
      dispatch(getEmployeesSuccess(res.data));
      return response.data;
    } catch (error) {
      dispatch(getEmployeesError(error.toString()));
    }
  };
};

export const deleteEmployee = (_id) => {
  return async (dispatch) => {
    dispatch(deleteEmployeePending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/employees/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteEmployeeSuccess(_id));
    } catch (error) {
      dispatch(deleteEmployeeError(error.toString()));
    }
  };
};

export const addEmployee = (employee) => {
  return async (dispatch) => {
    dispatch(addEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          first_name: employee.first_name,
          last_name: employee.last_name,
          phone: employee.phone,
          email: employee.email,
          password: employee.password,
          active: employee.active
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.msg;
      }
      dispatch(addEmployeeSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(addEmployeeError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const editEmployee = (employee, _id) => {
  return async (dispatch) => {
    dispatch(editEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          first_name: employee.first_name,
          last_name: employee.last_name,
          phone: employee.phone,
          email: employee.email,
          password: employee.password,
          active: employee.active
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.msg;
      }
      dispatch(editEmployeeSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(editEmployeeError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};
