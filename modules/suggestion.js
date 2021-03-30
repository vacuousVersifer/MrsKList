module.exports = {
  judge: (suggestionName, judgement, suggestions, entries) => {
    // Gets the suggestion item and its index by name
    let suggestion = suggestions.getItemByKeyValuePair(
      "name",
      suggestionName
    );
    let index = suggestions.getIndexByItem(suggestion);

    // If the judgement was approve, add it to entries and tell client
    // Else tell client that it was denied
    let responce = { name: suggestionName, result: judgement};
    if(judgement === "approve") {
      entries.addItem(suggestion);
    }
    
    // Delete this suggestion from the database
    suggestions.deleteItemByIndex(index);

    return responce;
  }
};