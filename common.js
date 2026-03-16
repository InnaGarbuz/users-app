/* ================================
   USER MANAGEMENT APP
================================ */

/* =============================
   CONSTANTS
============================= */
const MOCK_API_URL = "https://69a9e70832e2d46caf479796.mockapi.io/users";

/* =============================
   STATE
============================= */
let users = [];

/* =============================
   DOM ELEMENTS
============================= */
const createUserForm = document.querySelector("[data-user-form]");
const userContainer = document.querySelector("[data-users-container]");
const editUserFormDialog = document.querySelector("[data-edit-user-form-dialog]");

/* =============================
   TEMPLATE FUNCTIONS
============================= */
const createUserCardTemplate = (user) => `
    <div class="user-card">
        <div class="user-card__image">
            <img src="${user.avatar}" alt="${user.name}">
        </div>
        <div class="user-card__text">
            <h3>${user.name}</h3>
            <p>City: ${user.city}</p>
            <p>Email: ${user.email}</p>
        </div>
        <div class="user-card__button">
            <button class="btn-primary btn-edit" data-user-id="${user.id}" data-user-edit-btn>Edit</button>
            <button class="btn-primary btn-delete" data-user-id="${user.id}" data-user-remove-btn>Delete</button>
        </div>
    </div>
`;

const createEditFormTemplate = (userId) => `
    <input type="text" name="userId" value="${userId}" hidden>
    <div class="control-field">
        <label for="nameId" class="form-label">User name</label>
        <input type="text" class="form-control" id="nameId" name="userName" maxlength="20" minlength="2" required>
    </div>
    <div class="control-field">
        <label for="citiId" class="form-label">City</label>
        <input type="text" class="form-control" id="citiId" name="userCity" maxlength="20" minlength="2" required>
    </div>
    <div class="control-field">
        <label for="emailId" class="form-label">User email</label>
        <input type="email" class="form-control form-contol--email" id="emailId" name="userEmail" required>
    </div>
    <div class="control-field">
        <label for="imageId" class="form-label">User image</label>
        <div class="select-wrapper">
            <select name="userImageUrl" class="form-control form-control--images" id="imageId">
                <option value="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_rp_progressive&w=740&q=80">Man</option>
                <option value="https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg">Woman</option>
                <option value="https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg">Woman 2</option>
                <option value="https://img.freepik.com/free-vector/smiling-blonde-boy-hoodie_1308-174731.jpg?semt=ais_rp_progressive&w=740&q=80">Man 2</option>
            </select>
        </div>
    </div>
    <button class="btn-submit">Edit user</button>
`;

/* =============================
   HELPER FUNCTIONS
============================= */
const getUserById = (userId) => users.find(user => user.id === userId);

const getUserNameById = (userId) => {
    const user = getUserById(userId);
    return user ? user.name : '';
};

const extractFormData = (form) => {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
};

/* =============================
   RENDER FUNCTIONS
============================= */
const renderUsers = () => {
    userContainer.innerHTML = '';
    users.forEach(user => {
        userContainer.insertAdjacentHTML("beforeend", createUserCardTemplate(user));
    });
};

const renderError = (message) => {
    userContainer.innerHTML = `<p class="text-center">${message}</p>`;
};

/* =============================
   API FUNCTIONS
============================= */
const fetchUsers = async () => {
    const response = await fetch(MOCK_API_URL);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
};

const createUser = async (userData) => {
    const response = await fetch(MOCK_API_URL, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { "Content-type": "application/json" }
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
};

const updateUser = async (userId, userData) => {
    const response = await fetch(`${MOCK_API_URL}/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: { "Content-type": "application/json" }
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
};

const deleteUser = async (userId) => {
    const response = await fetch(`${MOCK_API_URL}/${userId}`, {
        method: 'DELETE'
    });
    if (response.status === 404) throw new Error(`User ${userId} not found`);
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
};

/* =============================
   ASYNC HANDLERS
============================= */
const getUsersAsync = async () => {
    try {
        users = await fetchUsers();
        renderUsers();
    } catch (error) {
        console.error(error);
        renderError('Failed to load users');
    }
};

const createNewUserAsync = async (userData) => {
    try {
        const newUser = await createUser(userData);
        users.unshift(newUser);
        renderUsers();
        createUserForm.reset();
    } catch (error) {
        console.error(error);
    }
};

const editUserAsync = async (userData) => {
    try {
        const editedUser = await updateUser(userData.id, userData);
        users = users.map(user => user.id === editedUser.id ? editedUser : user);
        editUserFormDialog.close();
        renderUsers();
    } catch (error) {
        console.error(error);
    }
};

const removeUserAsync = async (userId) => {
    try {
        const removedUser = await deleteUser(userId);
        users = users.filter(user => user.id !== removedUser.id);
        renderUsers();
        createUserForm.reset();
    } catch (error) {
        console.error(error);
    }
};

/* =============================
   DIALOG FUNCTIONS
============================= */
const populateDialog = (userId, userName) => {
    editUserFormDialog.innerHTML = '';

    // Create form elements
    const editForm = document.createElement("form");
    const closeFormBtn = document.createElement("button");
    const titleEditForm = document.createElement("h3");

    // Setup close button
    closeFormBtn.classList.add('close-edit-form-btn');
    closeFormBtn.textContent = '×';
    closeFormBtn.type = 'button';
    closeFormBtn.addEventListener('click', () => editUserFormDialog.close());

    // Setup title
    titleEditForm.classList.add("edit-form-title");
    titleEditForm.textContent = `Edit ${userName}`;

    // Setup form
    editForm.classList.add("form");
    editForm.append(titleEditForm);
    editForm.innerHTML += createEditFormTemplate(userId);

    // Form submit handler
    editForm.addEventListener('submit', handleEditFormSubmit);

    // Append to dialog
    editUserFormDialog.append(editForm, closeFormBtn);
};

/* =============================
   EVENT HANDLERS
============================= */
const handleCreateFormSubmit = (e) => {
    e.preventDefault();

    const formData = extractFormData(createUserForm);

    const userData = {
        name: formData.userName,
        city: formData.userCity,
        email: formData.userEmail,
        avatar: formData.userImageUrl
    };

    createNewUserAsync(userData);
};

const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const formData = extractFormData(e.target);

    const userData = {
        id: formData.userId,
        name: formData.userName,
        city: formData.userCity,
        email: formData.userEmail,
        avatar: formData.userImageUrl
    };

    editUserAsync(userData);
};

const handleUserContainerClick = (e) => {
    const userId = e.target.dataset.userId;
    if (!userId) return;

    const userName = getUserNameById(userId);

    // Handle delete button click
    if (e.target.hasAttribute("data-user-remove-btn")) {
        const isConfirmed = confirm(`Do you want to delete ${userName}?`);
        if (isConfirmed) {
            removeUserAsync(userId);
        }
        return;
    }

    // Handle edit button click
    if (e.target.hasAttribute("data-user-edit-btn")) {
        populateDialog(userId, userName);
        editUserFormDialog.showModal();
    }
};

/* =============================
   EVENT LISTENERS
============================= */
createUserForm.addEventListener('submit', handleCreateFormSubmit);
userContainer.addEventListener('click', handleUserContainerClick);

/* =============================
   INITIALIZATION
============================= */
getUsersAsync();