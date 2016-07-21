function get(url,callback) {
    var client = new XMLHttpRequest();
    client.onreadystatechange = function() {
      if (client.readyState == 4 && client.status == 200) {
        callback(client.responseText);
      }
    };
    client.open("GET",url);
    client.send();
}


function post(formElement,callback) {
  var client = new XMLHttpRequest();

  client.onreadystatechange = function() {
    if (client.readyState == 4 && client.status == 200) {
      callback(client.responseText);
    }
  };

  var data = new FormData();
  var elements = formElement.querySelectorAll("input, select, textarea");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if(element.type == "file") {
      var files = element.files;
      for (var j = 0; j < files.length; j++) {
        var file = files[j]
        data.append(element.name,file);
      }
    } else {
      if(element.type == "radio") {
        if(element.checked) {
          console.log("Radio checked");
          data.append(element.name,element.value);
        }
      } else data.append(element.name,element.value);
    }
  }

  client.open("POST",formElement.action);
  client.send(data);
}

function setAjax(formElement,callback) {
  if(!formElement) return;	
  formElement.onsubmit = function(event) {
    event.preventDefault();
    event.stopPropagation();
    var method = formElement.getAttribute("method");
    switch(method) {
      case "POST":
        post(formElement,callback);
        break;
      case "GET":
      default:
        var url = formElement.action + "&";
        var inputs = formElement.querySelectorAll("input, select");
        for(var i = 0; i < inputs.length; ++i) {
          if(inputs[i].type == "submit")
            continue;
          url += inputs[i].name + "=" + inputs[i].value;
          if(i < inputs.length - 2)
            url += "&";
        }
        get(url,callback);
    }
  }
}

function makeAjaxAnchor(anchor,callback) {
    anchor.onclick = function(event) {
      event.preventDefault();
      event.stopPropagation();

      get(anchor.href,callback);

    }
  }