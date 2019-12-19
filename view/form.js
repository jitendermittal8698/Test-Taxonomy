var T;
var tierArray;
$(document).ready(function () {
    T = {
        t1 : {
            a : {
                ab : {},
                ac : {}
            },
            b : {
                ba : {},
                bb : {}
            }

        },
        t2 : {
            c : {
                cb : {},
                cc : {}
            },
            d : {
                da : {},
                db : {}
            }

        },
        t3 : {
            e : {
                eb : {},
                ec : {}
            },
            f : {
                fa : {},
                fb : {}
            }

        }
    }
    // T = {};
    tierArray = [T, 't1', 'a', 'ab'];
    renderHtml()
    $("#addbtn").on("click", addCategoryHandler);
    $('#deleteCategory').on("click", deleteCategoryHandler)
    $('#editCategory').on("click", editCategoryHandler)
    $('#addSubcategory').on("click", addSubCategoryHandler)
    $('#moveToCategory').on("click", moveToCategoryHandler)

})

function getRequiredObject() {
    var requiredObject;
    tierArray.forEach(function (value, index) {
        if (index == 0) {
            requiredObject = value
        }
        else {
            if (requiredObject[value] !== undefined) {
                requiredObject = requiredObject[value];
            }
            else {
                requiredObject = [];
                alert('Dont Try To Play With tierarray');
            }
        }
    });
    return requiredObject;
}

function getNavigationHtml() {
    var navigationLinks = '';
    tierArray.forEach(function (value, index) {
        if (index == 0) {
            navigationLinks += '<a onclick="tierArray.length=1;renderHtml();">T</a>';
        }
        else {
            if (value !== undefined) {
                navigationLinks += '> <a onclick="getSelectedNavLink()" id="nav-' + value + '">' + value + '</a>';
            }
        }
    })
    return navigationLinks;
}

function renderHtml() {
    var requiredObject = getRequiredObject();
    var navigationLinks = getNavigationHtml();
    let localHtml = '';
    Object.keys(requiredObject).forEach(function (value, index) {
        localHtml += '<li><input type="radio" name="tab" id="' + value + '" class="inputRadio"/><label>' + value + '</label></li>'
    });
    $('#formRadioInput').html(navigationLinks + '<br>' + localHtml);
    addValidation();
}

var addCategoryHandler = function(event){
    var addTabvalue = $("#addTabinput").val();
    var requiredObject = getRequiredObject();
    if(!requiredObject.hasOwnProperty(addTabvalue)) {
        requiredObject[addTabvalue] = {};
        renderHtml();
    }
    else {
        alert('value is not unique');
    }
}

var addSubCategoryHandler = function(event){
    if (!checkMaxLimit()) {
        return false;
    }
    var clickedRadioBoxId = getSelectedCheckBox().attr('id');
    var addTabvalue = $("#subTabinput").val();
    var requiredObject = getRequiredObject();
    if (addTabvalue == "") {
        alert("Please Enter Some Value")
        return;
    }
    if(requiredObject.hasOwnProperty(clickedRadioBoxId)) {
        if(!requiredObject[clickedRadioBoxId].hasOwnProperty(addTabvalue)) {
            requiredObject[clickedRadioBoxId][addTabvalue] = {};
            tierArray.push(clickedRadioBoxId)
            tierArray.push(addTabvalue)
            renderHtml();
        }
    }
    else {
        alert('value is not unique');
    }
}


function editCategoryHandler() {
    var clickedRadioBoxId = getSelectedCheckBox().attr('id');
    var editedValue = $("#editTabinput").val();
    var requiredObject = getRequiredObject();
    if (editedValue == "") {
        alert("Please Enter Some Value")
        return;
    }
    if(requiredObject.hasOwnProperty(clickedRadioBoxId)) {
        delete requiredObject[clickedRadioBoxId];
        requiredObject[editedValue] = {};
        renderHtml();
    }
    else {
        alert('Please Select Radio Box First');
    }
}

function deleteCategoryHandler() {
    var clickedRadioBoxId = getSelectedCheckBox().attr('id');
    if (clickedRadioBoxId !== undefined) {
        var requiredObject = getRequiredObject();
        delete requiredObject[clickedRadioBoxId];
        renderHtml();
    }
    else {
        alert('Please specify which item you want to delete')
    }
}


function getSelectedCheckBox() {
    return $('#formRadioInput input[type="radio"]:checked');
}

function getSelectedNavLink() {
    var selectedNavLink = $('#' + event.target.id);
    var selectedNavLinkIndex = tierArray.indexOf(selectedNavLink.attr('id').replace('nav-',''))
    tierArray.length = selectedNavLinkIndex + 1;
    renderHtml()
}

function moveToCategoryHandler() {
    if (!checkMaxLimit()) {
        return false;
    }
    var clickedRadioBoxId = getSelectedCheckBox().attr('id');
    if (clickedRadioBoxId !== undefined) {
        tierArray.push(clickedRadioBoxId);
        renderHtml();
    }
    else  {
        alert('Please Specify which category you want to move into')
    }
}

function addValidation() {
    $('#deleteCategory').attr('disabled', 'disabled')
    $('#editCategory').attr('disabled', 'disabled')
    $('#addSubcategory').attr('disabled', 'disabled')
    $('#moveToCategory').attr('disabled', 'disabled')
    $('#formRadioInput input[type="radio"]').each(function(index, element) {
        element.addEventListener('click', function() {
            if(getSelectedCheckBox()) {
                $('#deleteCategory').removeAttr('disabled')
                $('#editCategory').removeAttr('disabled')
                $('#addSubcategory').removeAttr('disabled')
                $('#moveToCategory').removeAttr('disabled')
            }
            else {
                $('#deleteCategory').attr('disabled', 'disabled')
                $('#editCategory').attr('disabled', 'disabled')
                $('#addSubcategory').attr('disabled', 'disabled')
                $('#moveToCategory').attr('disabled', 'disabled')
            }
        })
    })
}

function checkMaxLimit() {
    if (tierArray.length >= 4) {
        alert('Only 4 Subcategories are allowed')
        return false;
    }
    else {
        return true;
    }
}