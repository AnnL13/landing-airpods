function submitOrderForm () {
  document.getElementById('orderForm').addEventListener('submit', function (event) {
      event.preventDefault()

      var name = document.getElementById('username').value
      var phone = document.getElementById('phone').value
      var hiddenField = document.getElementById('hiddenField').value

      if (!validatePhone(phone)) {
        alert(
          'Недопустимый формат номера телефона. Используйте формат: +7(777)777-77-77'
        )
        return
      }

      if (this.getAttribute('data-submitted')) {
        alert('Вы уже отправили форму. Пожалуйста, попробуйте позже.')
        return
      }

      this.setAttribute('data-submitted', 'true')

      var formData = {
        stream_code: 'iu244',
        client: {
          name: name,
          phone: phone
        },
        sub1: hiddenField
      }

      var xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://order.drcash.sh/v1/order', true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader(
        'Authorization',
        'Bearer NWJLZGEWOWETNTGZMS00MZK4LWFIZJUTNJVMOTG0NJQXOTI3'
      )

      xhr.onload = function () {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText)
          if (response.success) {
            window.location.href = '/app/thank_you.php'
          } else {
            alert('Ошибка обработки заказа. Пожалуйста, попробуйте ещё раз.')
          }
        } else {
          alert('Ошибка обработки заказа. Пожалуйста, попробуйте ещё раз.')
        }
      }

      xhr.send(JSON.stringify(formData))
    })

  function validatePhone (phone) {
    var regex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/
    return regex.test(phone)
  }
}
