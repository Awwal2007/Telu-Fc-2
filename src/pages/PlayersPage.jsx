

const PlayersPage = () => {

  return (
    <div className="player-dashboard">
        <div className="section">
          <div class="dashboard-nav">
              <div class="nav-container">
                  <div class="user-info">
                      <i class="fa-solid fa-circle-user"></i>
                      <h3 id="userName">Administrator Name</h3>
                      <p id="userEmail">juan.delacruz@gmail.com</p>
                  </div>
                  <nav>
                      <ul>
                          <li class="active">
                              <a href="">
                                  <i class="fa-solid fa-table-columns"></i>
                                  <p>Dashboard</p>
                              </a>                        
                          </li>
                          <li>
                              <a href="">
                                  <i class="fa-regular fa-house"></i>
                                  <p>Admin Profile</p>
                              </a>                        
                          </li>
                          <li>
                              <a href="">
                                  <i class="fa-regular fa-pen-to-square"></i>
                                  <p>Registration</p>
                              </a>                        
                          </li>
                          <li>
                              <a href="">
                                  <i class="fa-regular fa-address-book"></i>
                                  <p>Plan</p>
                              </a>                        
                          </li>
                          <li>
                              <a href="">
                                  <i class="fa-regular fa-credit-card"></i>
                                  <p>Payment</p>
                              </a>                        
                          </li>
                          <li>
                              <a href="">
                                  <i class="fa-solid fa-box-archive"></i>
                                  <p>Inventory</p>
                              </a>                        
                          </li>
                          <li>
                              <a href="">
                                  <i class="fa-solid fa-user-group"></i>
                                  <p>View Members</p>
                              </a>                        
                          </li>
                          <li>
                              <a href="">
                                  <i class="fa-solid fa-dumbbell"></i>
                                  <p>Coaches</p>
                              </a>                        
                          </li>
                          <li>
                              <a href="">
                                <i class="fa-solid fa-book-open"></i>
                                <p>Report</p>
                              </a>                        
                          </li>
                      </ul>
                  </nav>
              </div>
              <div class="logout-btn-container">
                  <button class="logout-btn">
                      <i class="fa-solid fa-arrow-right-from-bracket"></i>
                      <p>Logout</p>
                  </button>
              </div>
          </div>

          <div class="dashboard">
              <div class="dashboard-header">
                  <div>
                      <a href="/dashboard.html">
                        <img src="./images/dashboard logo.png" alt="dashboard logo"/>
                      </a>
                  </div>
                  <div>
                      <a href="">Feedback</a>
                      <i class="fa-solid fa-bell"></i>
                  </div>
              </div>

              <div class="content">
                  <div class="left">
                      <div class="top">
                          <div class="welcome-message">
                              <div>
                                  Welcome Banner, <span>Martel</span>
                              </div>
                              <div>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                              </div>
                          </div>
                          <div class="circle">
                              
                          </div>                        
                      </div>
                      <div class="middle">
                          <div class="middle-content-cont">
                              <div class="middle-content">
                                  <h3>Coaches</h3>
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                              </div>
                              <div class="middle-content-2">
                                  <div>
                                      <span class="circle"></span>
                                      <p>Juan Dela Cruz</p>
                                  </div>
                                  <div>
                                      <span class="circle"></span>
                                      <p>Juan Dela Cruz</p>
                                  </div>
                                  
                              </div>
                          </div>
                          <div class="middle-content-cont">
                              <div class="middle-content">
                                  <h3>Sales</h3>
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                              </div>
                              <div class="sales-container">
                                  <div>
                                      <div>
                                          84%
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="bottom">
                          <h3>Active Members</h3>
                          <div>
                              <div class="search-container">
                                  <div class="input-container">
                                      <input type="search" placeholder="search" />
                                      <i class="fa-solid fa-magnifying-glass"></i>
                                  </div>
                                  <div class="sort-container">
                                      <p>Sort by</p>
                                      <i class="fa-solid fa-up-down"></i>
                                  </div>
                              </div>
                              
                              <div class="members-container">
                                  <div class="members-details">
                                      <div class="">
                                          <div>
                                            <div class="circle"></div>
                                          </div>
                                          <div>
                                            <p>James Medalla</p>
                                          </div>
                                          <div>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                          </div>
                                      </div>
                                      <div class="">
                                          <div>
                                              <div class="circle"></div>
                                          </div>
                                          <div>
                                              <p>James Medalla</p>
                                          </div>
                                          <div>
                                              <i class="fa-solid fa-ellipsis-vertical"></i>
                                          </div>
                                      </div>
                                      <div class="">
                                          <div>
                                              <div class="circle"></div>
                                          </div>
                                          <div>
                                              <p>James Medalla</p>
                                          </div>
                                          <div>
                                              <i class="fa-solid fa-ellipsis-vertical"></i>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="members-infos">
                                      <p>Date Paid</p>
                                      <p>Date Expiry</p>
                                      <p>Status</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="right">
                      <div class="content">
                        <h3>Calender</h3>
                      </div>
                      <div class="content">
                        <h3>Inventory</h3>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    
  );
};

export default PlayersPage;
