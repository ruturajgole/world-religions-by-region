function initializeSelectors(stats) {
    const container = document.getElementById("selectors");

    const dropDowns = Object.keys(stats[0]).filter((key) =>
        key.includes("year") |
        key.includes("state") |
        key.includes("region") |
        key.startsWith("code")
    );

    dropDowns.forEach((key) =>
        addSelect(key, stats, container, (select) =>
            selectOption(select, container))
    ); 

    addCheckbox("world_population",
        container,
        (checkbox) => onCheck(checkbox, container),
        "World Population",
    );

    religionList = getReligions(stats);
    religions = splitSubtypes(religionList);

    const title = document.createElement("h3");    
    title.innerHTML = "Religions";
    container.appendChild(title);

    Object.keys(religions).forEach((religion) => 
        addCheckbox(religion, container, (checkbox) =>
            religionCheck(checkbox, container, religions[religion])));
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

function religionCheck (checkbox, container, subtypes) {
    if (checkbox.checked) {
        const subtypeDiv = document.createElement("div");
        subtypeDiv.id = checkbox.value;
        container.appendChild(subtypeDiv);

        const title = document.createElement("h3");    
        title.innerHTML = `Subtypes for ${capitalize(checkbox.value)}`;
        subtypeDiv.appendChild(title);

        subtypes.forEach((subtype) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = subtype + "_checkbox";
            checkbox.value = subtype;
    
            const label = document.createElement('label')
            label.htmlFor = checkbox.id;
            label.appendChild(document.createTextNode(capitalize(subtype)));

            subtypeDiv.appendChild(checkbox);
            subtypeDiv.appendChild(label);
        })
    } else {
        const subtypeDiv = document.getElementById(checkbox.value);
        container.removeChild(subtypeDiv);
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1) + " ";
}

function addSelect(key, stats, container, onChange) {
    const values = Array.from(new Set(stats.map((stat) => stat[key])));
    const select = document.createElement("select");
    select.id = key + "_selector";
    select.value = key;
    select.onchange = ({target}) => onChange(target, container);

    const label = document.createElement('label')
    label.htmlFor = select.id;
    label.appendChild(document.createTextNode(capitalize(key)));

    const br = document.createElement('br');

    container.appendChild(label);
    container.appendChild(select);
    container.appendChild(br);

    values.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        select.appendChild(option);
    });
}

function addCheckbox(value, container, onChange, name = false) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = value + "_checkbox";
    checkbox.value = value;
    checkbox.onchange = ({target}) => onChange(target, container);

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.appendChild(document.createTextNode(capitalize(name ? name : value)));
            
    container.appendChild(checkbox);
    container.appendChild(label);
}