const API_URL = window.location.origin + '/api';

class ToolBodyApp {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = null;
        this.init();
    }

    async init() {
        if (this.token) {
            await this.checkAuth();
        }
    }

    async checkAuth() {
        try {
            const response = await fetch(`${API_URL}/toolbodies`, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });
            if (response.ok) {
                this.showApp();
            } else {
                this.token = null;
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
    }

    showAuthTab(tab) {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        document.getElementById('loginForm').classList.toggle('hidden', tab !== 'login');
        document.getElementById('registerForm').classList.toggle('hidden', tab !== 'register');
    }

    async register() {
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const role = document.getElementById('regRole').value;

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, role })
            });

            const data = await response.json();
            
            if (data.success) {
                this.showAlert('Registration successful! Please login.', 'success');
                this.showAuthTab('login');
            } else {
                this.showAlert(data.error, 'error');
            }
        } catch (error) {
            this.showAlert('Registration failed', 'error');
        }
    }

    async login() {
        const username = document.getElementById('loginUsername').value;

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            const data = await response.json();
            
            if (data.success) {
                this.token = data.data.session.token;
                this.user = data.data.user;
                localStorage.setItem('token', this.token);
                this.showApp();
            } else {
                this.showAlert(data.error, 'error');
            }
        } catch (error) {
            this.showAlert('Login failed', 'error');
        }
    }

    async logout() {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${this.token}` }
            });
        } catch (error) {
            console.error('Logout error:', error);
        }

        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        
        document.getElementById('authSection').classList.remove('hidden');
        document.getElementById('appSection').classList.add('hidden');
    }

    showApp() {
        document.getElementById('authSection').classList.add('hidden');
        document.getElementById('appSection').classList.remove('hidden');
        
        if (this.user) {
            document.getElementById('currentUsername').textContent = this.user.username;
            document.getElementById('currentUserRole').textContent = this.user.role;
        }
        
        this.loadToolBodies();
    }

    async installToolBody() {
        const name = document.getElementById('installName').value;
        const serialNumber = document.getElementById('installSerial').value;
        const machineId = document.getElementById('installMachine').value;
        const initialRunTimeMinutes = parseInt(document.getElementById('installRuntime').value);

        try {
            const response = await fetch(`${API_URL}/toolbodies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ name, serialNumber, machineId, initialRunTimeMinutes })
            });

            const data = await response.json();
            
            if (data.success) {
                this.showAlert('Tool body installed successfully', 'success');
                this.clearForm(['installName', 'installSerial', 'installMachine', 'installRuntime']);
                this.loadToolBodies();
                this.showSection('list');
            } else {
                this.showAlert(data.error, 'error');
            }
        } catch (error) {
            this.showAlert('Installation failed', 'error');
        }
    }

    async updateToolBody() {
        const id = document.getElementById('updateId').value;
        const currentRunTimeMinutes = parseInt(document.getElementById('updateRuntime').value);

        try {
            const response = await fetch(`${API_URL}/toolbodies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ currentRunTimeMinutes })
            });

            const data = await response.json();
            
            if (data.success) {
                this.showAlert('Runtime updated successfully', 'success');
                this.clearForm(['updateId', 'updateRuntime']);
                this.loadToolBodies();
                this.showSection('list');
            } else {
                this.showAlert(data.error, 'error');
            }
        } catch (error) {
            this.showAlert('Update failed', 'error');
        }
    }

    async loadToolBodies() {
        try {
            const response = await fetch(`${API_URL}/toolbodies`, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });

            const data = await response.json();
            
            if (data.success) {
                this.renderToolBodies(data.data);
            }
        } catch (error) {
            console.error('Failed to load tool bodies:', error);
        }
    }

    renderToolBodies(toolBodies) {
        const list = document.getElementById('toolBodyList');
        list.innerHTML = '';

        if (toolBodies.length === 0) {
            list.innerHTML = '<p class="alert">No tool bodies found</p>';
            return;
        }

        toolBodies.forEach(record => {
            const card = document.createElement('div');
            card.className = 'tool-body-card';
            card.innerHTML = `
                <h3>${record.toolBody.name}</h3>
                <p><strong>Serial:</strong> ${record.toolBody.serialNumber}</p>
                <p><strong>Machine:</strong> ${record.toolBody.machineId}</p>
                <p><strong>Runtime:</strong> ${this.formatDuration(record.totalRunTimeMinutes)}</p>
                <button class="btn btn-primary" onclick="app.fillUpdateForm('${record.toolBody.id}', ${record.totalRunTimeMinutes})">Update</button>
                <button class="btn btn-danger" onclick="app.removeToolBody('${record.toolBody.id}')">Remove</button>
            `;
            list.appendChild(card);
        });
    }

    fillUpdateForm(id, runtime) {
        document.getElementById('updateId').value = id;
        document.getElementById('updateRuntime').value = runtime;
        this.showSection('update');
    }

    async removeToolBody(id) {
        if (!confirm('Are you sure?')) return;

        try {
            const response = await fetch(`${API_URL}/toolbodies/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${this.token}` }
            });

            const data = await response.json();
            
            if (data.success) {
                this.showAlert('Tool body removed', 'success');
                this.loadToolBodies();
            } else {
                this.showAlert(data.error, 'error');
            }
        } catch (error) {
            this.showAlert('Removal failed', 'error');
        }
    }

    async createOrganization() {
        const name = document.getElementById('orgName').value;

        try {
            const response = await fetch(`${API_URL}/organizations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ name })
            });

            const data = await response.json();
            
            if (data.success) {
                this.showAlert(`Organization created: ${data.data.id}`, 'success');
                document.getElementById('orgName').value = '';
            } else {
                this.showAlert(data.error, 'error');
            }
        } catch (error) {
            this.showAlert('Creation failed', 'error');
        }
    }

    showSection(section) {
        ['installSection', 'updateSection', 'listSection', 'orgSection', 'auditSection'].forEach(s => {
            document.getElementById(s).classList.add('hidden');
        });
        document.getElementById(section + 'Section').classList.remove('hidden');

        if (section === 'list') this.loadToolBodies();
    }

    formatDuration(minutes) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
    }

    showAlert(message, type) {
        const alertBox = document.getElementById('alertBox');
        alertBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        setTimeout(() => alertBox.innerHTML = '', 5000);
    }

    clearForm(ids) {
        ids.forEach(id => document.getElementById(id).value = '');
    }
}

const app = new ToolBodyApp();
