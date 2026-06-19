// ===== Navigation =====

function setActiveNav() {
  var links = document.querySelectorAll('nav ul li a');
  var currentPage = window.location.pathname.split('/').pop();

  links.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

setActiveNav();


// ===== Form record =====

var bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var service = document.getElementById('service').value;
    var date = document.getElementById('date').value;

    if (!name || !phone || !service || !date) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    // Save record to locale storage
    var orders = JSON.parse(localStorage.getItem('orders') || '[]');
    var newOrder = {
      id: Date.now(),
      name: name,
      phone: phone,
      service: service,
      date: date,
      comment: document.getElementById('comment').value.trim(),
      status: 'pending'
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert('Запись оформлена! Ждём вас ' + date + '.');
    bookingForm.reset();
  });
}


// ===== Orders =====

function loadOrders() {
  var list = document.getElementById('ordersList');
  if (!list) return;

  var orders = JSON.parse(localStorage.getItem('orders') || '[]');

  if (orders.length === 0) {
    list.innerHTML = '<p class="orders-empty">У вас пока нет записей.</p>';
    return;
  }

  var html = '';
  orders.forEach(function(order) {
    var statusText = '';
    var statusClass = '';

    if (order.status === 'pending') {
      statusText = 'Ожидает подтверждения';
      statusClass = 'status-pending';
    } else if (order.status === 'inwork') {
      statusText = 'В работе';
      statusClass = 'status-inwork';
    } else if (order.status === 'done') {
      statusText = 'Выполнено';
      statusClass = 'status-done';
    }

    html += '<div class="order-card">';
    html += '<div class="order-info">';
    html += '<h3>' + order.service + '</h3>';
    html += '<p>' + order.name + ' · ' + order.phone + '</p>';
    html += '<p>Дата: ' + order.date + '</p>';
    if (order.comment) {
      html += '<p>Комментарий: ' + order.comment + '</p>';
    }
    html += '</div>';
    html += '<span class="status ' + statusClass + '">' + statusText + '</span>';
    html += '</div>';
  });

  list.innerHTML = html;
}

loadOrders();


// ===== Profile: Tabs =====

var tabButtons = document.querySelectorAll('.tab-btn');
var tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var target = btn.getAttribute('data-tab');

    tabButtons.forEach(function(b) { b.classList.remove('active'); });
    tabContents.forEach(function(c) { c.classList.remove('active'); });

    btn.classList.add('active');
    var targetEl = document.getElementById(target);
    if (targetEl) targetEl.classList.add('active');
  });
});


// ===== Profile: Form register/enter =====

var registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var regName = document.getElementById('regName').value.trim();
    var regEmail = document.getElementById('regEmail').value.trim();
    var regPassword = document.getElementById('regPassword').value;

    if (!regName || !regEmail || !regPassword) {
      alert('Заполните все поля.');
      return;
    }

    var user = { name: regName, email: regEmail };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Регистрация прошла успешно! Добро пожаловать, ' + regName + '!');
    showProfile();
  });
}

var loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.getElementById('loginEmail').value.trim();
    if (!email) {
      alert('Введите email.');
      return;
    }
    var user = { name: 'Пользователь', email: email };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Вход выполнен!');
    showProfile();
  });
}

function showProfile() {
  var user = JSON.parse(localStorage.getItem('user') || 'null');
  var authSection = document.getElementById('authSection');
  var profileSection = document.getElementById('profileSection');
  if (!authSection || !profileSection) return;

  if (user) {
    authSection.style.display = 'none';
    profileSection.classList.remove('profile-hidden');
    var nameEl = document.getElementById('profileName');
    var emailEl = document.getElementById('profileEmail');
    if (nameEl) nameEl.value = user.name;
    if (emailEl) emailEl.value = user.email;
  } else {
    authSection.style.display = 'block';
    profileSection.classList.add('profile-hidden');
  }
}

showProfile();

var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Сообщение отправлено! Мы ответим вам в ближайшее время.');
    contactForm.reset();
  });
}
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('user');
    showProfile();
  });
}

var editProfileForm = document.getElementById('editProfileForm');
if (editProfileForm) {
  editProfileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('profileName').value.trim();
    var email = document.getElementById('profileEmail').value.trim();
    var user = { name: name, email: email };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Данные сохранены!');
  });
}
