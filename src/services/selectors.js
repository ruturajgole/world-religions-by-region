function initializeSelectors(stats) {
    const container = document.getElementById("selectors");
    const currentValues = {selected: {}, checked: []};

    const dropDowns = Object.keys(stats[0]).filter((key) =>
        key.includes("year") |
        key.includes("state") |
        key.includes("region") |
        key.startsWith("code")
    );

    dropDowns.forEach((key) => {
        if (key == "year") {
            addSelect(key, stats, container, currentValues, (select) =>
                selectOption(select, currentValues, stats), "From");
            addSelect(key, stats, container, currentValues, (select) =>
                selectOption(select, currentValues, stats), "To");
        } else {
            addSelect(key, stats, container, currentValues, (select) =>
                selectOption(select, currentValues, stats))
        }
        const br = document.createElement("br");
        const error = document.createElement("p");
        error.id = "error";

        container.appendChild(br);
        container.appendChild(error);
    }); 

    addCheckbox("world_population",
        container,
        (checkbox) => onCheck(checkbox, currentValues, stats),
        "World Population",
    );

    religionList = getReligions(stats);
    religions = splitSubtypes(religionList);

    const title = document.createElement("h3");    
    title.innerHTML = "Religions";
    container.appendChild(title);

    Object.keys(religions).forEach((religion) =>
        addCheckbox(religion, container, (checkbox) =>
            religionCheck(checkbox, container, stats, currentValues, religions[religion])));
}

function getReligions(stats) {
    religionList = Object.keys(stats[0]).filter((key) =>
        !key.includes("year") &
        !key.includes("percent") &
        !key.includes("population") &
        !key.includes("region") &
        !key.includes("state") &
        !key.includes("code")
    );
    
    return religionList;
}

function splitSubtypes(religionList) {
    religions = {};

    religionList.forEach((religion) => {
        name = religion.split("_")[0];
        subtype = religion.split("_")[1];

        if(religions[name] === undefined) {
            religions[name] = [];
        }

        religions[name].push(subtype);
    });
    
    return religions;
}

function selectOption(select, currentValues, stats) {
    if (select.id == "from" | select.id == "to") {
        currentValues[select.id] = select.value;
    } else {
        currentValues.selected[select.id] = select.value;
    }
    getValues(currentValues, stats);
}

function onCheck(checkbox, currentValues, stats) {
    if (checkbox.checked) {
        currentValues.checked.push(checkbox.id);
    } else {
        currentValues.checked = currentValues.checked.filter((value) => value != checkbox.id);
    }
    getValues(currentValues, stats);
}

function religionCheck (checkbox, container, stats, currentValues, subtypes) {
    if (checkbox.checked) {
        const subtypeDiv = document.createElement("div");
        subtypeDiv.id = checkbox.value;
        container.appendChild(subtypeDiv);

        const title = document.createElement("h3");    
        title.innerHTML = `Subtypes for ${capitalize(checkbox.value)}`;
        subtypeDiv.appendChild(title);

        subtypes.forEach((subtype) => {
            addCheckbox(`${checkbox.id}_${subtype}`, subtypeDiv, (checkbox) =>
                onCheck(checkbox, currentValues, stats), subtype);
        });
    } else {
        const subtypeDiv = document.getElementById(checkbox.value);
        container.removeChild(subtypeDiv);
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1) + " ";
}

function addSelect(key, stats, container, currentValues, onChange, name = false) {
    const values = Array.from(new Set(stats.map((stat) => stat[key])));
    const select = document.createElement("select");

    if (name) {
        select.id = name == "From" ? "from" : "to"; 
    } else {
        select.id = key;
    }

    select.value = key;

    const label = document.createElement('label')
    label.htmlFor = select.id;
    label.appendChild(document.createTextNode(capitalize(name ? name : key)));

    container.appendChild(label);
    container.appendChild(select);

    values.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        select.appendChild(option);
    });

    if (select.id == "from" | select.id == "to") {
        currentValues[select.id] = select.value;
    } else {
        currentValues.selected[select.id] = select.value;
    }
    select.onchange = ({target}) => onChange(target, currentValues);
}

function addCheckbox(value, container, onChange, name = false) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = value;
    checkbox.value = value;

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.appendChild(document.createTextNode(capitalize(name ? name : value)));
            
    container.appendChild(checkbox);
    container.appendChild(label);

    checkbox.onchange = ({target}) => onChange(target);
}

function getValues(currentValues, stats) {
    const text = document.getElementById("error");
    text.style.color = "red";
    from = currentValues.from;
    to = currentValues.to;
    if (from > to) {
        text.innerHTML = "Start year cannot be greater than end year";
        return;
    }
    text.innerHTML = "";
    
    stats = stats.filter((stat) => from <= stat.year & to >= stat.year);
    Object.keys(currentValues.selected).forEach((key) => {
        stats = stats.filter((stat) => currentValues.selected[key] == stat[key])
    });

    data = {};
    if (currentValues.checked.length <=0){
        clearGraph();
        return;
    }

    currentValues.checked.forEach((key) => {
        data[key] = stats.map((stat) => ({x: stat.year, y: stat[key]}));
    });

    plot(data);
}