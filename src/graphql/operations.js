import { gql } from '@apollo/client';

/**
 * GraphQL query for retrieving all employees with their performance score and performance metrics.
 */
export const GET_EMPLOYEES = gql`
  query GetEmployees {
    getAllEmployees {
      id
      name
      performanceMetrics {
        metric1
        metric2
        metric3
      }
      performanceScore
    }
  }
`;

/**
 * GraphQL mutation for creating a new employee with specified name and performance metrics.
 * Requires name (String) and performanceMetrics (PerformanceMetricsInput) as parameters.
 */
export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($name: String!, $performanceMetrics: PerformanceMetricsInput!) {
    createEmployee(name: $name, performanceMetrics: $performanceMetrics) {
      id
      name
      performanceMetrics {
        metric1
        metric2
        metric3
      }
      performanceScore
    }
  }
`;

/**
 * GraphQL mutation for updating an existing employee's performance metrics.
 * Requires employee ID (ID) and new performance metrics (PerformanceMetricsInput).
 */
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $performanceMetrics: PerformanceMetricsInput!) {
    updateEmployee(id: $id, performanceMetrics: $performanceMetrics) {
      id
      name
      performanceMetrics {
        metric1
        metric2
        metric3
      }
      performanceScore
    }
  }
`;

/**
 * GraphQL mutation for deleting an employee by ID.
 * Requires the ID (ID) of the employee to delete.
 */
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;