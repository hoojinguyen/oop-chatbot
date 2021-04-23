const entityMap = {
    "oop": [
        "class",
        "object",
        "interface"
    ]
}


exports.parentEntityDetect = (entity1, entity2) => {
    if (entityMap[entity1].includes(entity2)) {
        return entity1;

    } else if (entityMap[entity2].includes(entity1)) {
        return entity2;
    } else return false;
}