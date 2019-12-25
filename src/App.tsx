import * as React from 'react';
import {Table, Button} from 'react-bootstrap';
import * as UserAPI from './firebase/db';
import './App.css';

interface InterfaceState {
  userData: any[];
  length: number;
  currentStep: number;
  endStep: number;
  firstUserData: any;
  lastUserData: any;
  lastSortingKey: string;
  sortingType: boolean;
}

interface InterfaceProps {}

interface IRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  residenceCountry?: string;
  residenceCity?: string;
  lastActivity?: string;
  sortingKey?: string;
  sortingType?: boolean;
}

class App extends React.Component<InterfaceProps, InterfaceState> {
  constructor(props: InterfaceProps) {
    super(props);
    this.state = {
      userData: [],
      length: 0,
      currentStep: 1,
      endStep: 0,
      firstUserData: {},
      lastUserData: {},
      lastSortingKey: 'email',
      sortingType: true,
    };
    this.getFirstPageData = this.getFirstPageData.bind(this);
    this.getNextPageData = this.getNextPageData.bind(this);
    this.getPreviousPageData = this.getPreviousPageData.bind(this);
    this.getLengthOfUser = this.getLengthOfUser.bind(this);

    //sorting function
    this.sorting = this.sorting.bind(this);
  }

  public componentDidMount() {
    this.getFirstPageData();
    this.getLengthOfUser();
  }

  // get length of user function
  public getLengthOfUser() {
    let request: IRequest = {};
    UserAPI.getLengthOfUser(request, response => {
      this.setState({
        length: response,
        endStep: Math.ceil(response / 5),
      });
    });
  }

  public getFirstPageData() {
    let request: IRequest = {};
    request.sortingKey = this.state.lastSortingKey;
    request.sortingType = this.state.sortingType;
    UserAPI.getFirstPageData(request, response => {
      this.setState({
        userData: response,
        lastUserData: response[4],
        firstUserData: response[0],
      });
    });
  }

  public getNextPageData() {
    let request: IRequest = {};
    request.email = this.state.lastUserData.email;
    request.sortingKey = this.state.lastSortingKey;
    request.sortingType = this.state.sortingType;
    UserAPI.getNextPageData(request, response => {
      this.setState({
        userData: response.slice(1, 6),
        lastUserData: response[5],
        firstUserData: response[1],
        currentStep: this.state.currentStep + 1,
      });
    });
  }

  public getPreviousPageData() {
    var request: any = {};
    request.email = this.state.firstUserData.email;
    request.sortingKey = this.state.lastSortingKey;
    UserAPI.getPreviousPageData(request, response => {
      this.setState({
        userData: response.slice(0, 5),
        lastUserData: response[4],
        firstUserData: response[0],
        currentStep: this.state.currentStep - 1,
      });
    });
  }

  public sorting(sortingKey: string) {
    let sortingType: boolean = this.state.sortingType;
    sortingType = !this.state.sortingType;
    this.setState(
      {
        lastSortingKey: sortingKey,
        sortingType: sortingType,
      },
      () => this.getFirstPageData()
    );
  }

  public render() {
    // console.log("this.state---", this.state)
    return (
      <div className="App">
        <h1 className="table-label">User Table</h1>
        <Table className="user-table" striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th
                onClick={(event: any, sortingKey: string = 'firstName') =>
                  this.sorting(sortingKey)
                }
              >
                First Name
              </th>
              <th
                onClick={(event: any, sortingKey: string = 'account/surname') =>
                  this.sorting(sortingKey)
                }
              >
                Last Name
              </th>
              <th
                onClick={(event: any, sortingKey: string = 'email') =>
                  this.sorting(sortingKey)
                }
              >
                Email
              </th>
              <th
                onClick={(event: any, sortingKey: string = 'account/dob') =>
                  this.sorting(sortingKey)
                }
              >
                Phone No
              </th>
              <th
                onClick={(
                  event: any,
                  sortingKey: string = 'account/residenceCountry'
                ) => this.sorting(sortingKey)}
              >
                Residence Country
              </th>
              <th
                onClick={(
                  event: any,
                  sortingKey: string = 'account/residenceCity'
                ) => this.sorting(sortingKey)}
              >
                Residence City
              </th>
              <th
                onClick={(event: any, sortingKey: string = 'lastActive') =>
                  this.sorting(sortingKey)
                }
              >
                Last Active
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.userData.map((data, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{data.account.firstName}</td>
                  <td>{data.account.surname}</td>
                  <td>{data.account.email}</td>
                  <td>{data.account.dob}</td>
                  <td>{data.account.residenceCountry}</td>
                  <td>{data.account.residenceCity}</td>
                  <td>{data.lastActive}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="button-div">
          <Button
            disabled={this.state.currentStep === 1}
            className="previous-btn"
            onClick={this.getPreviousPageData}
          >
            Previous
          </Button>
          <Button
            disabled={this.state.currentStep === this.state.endStep}
            className="next-btn"
            onClick={this.getNextPageData}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
