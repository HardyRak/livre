const Books = require('../models/livre');

const getBooks = async (page = 1, limit = 5, order = 'id', orderType = 1) => {
    const skip = (page - 1) * limit;
    if(order=='titre'){
        return await getBooksOrderByTitle(limit,skip,orderType);
    }else if(order=='pages'){
        return await getBooksOrderByPage(limit,skip,orderType);
    }
    const books = await Books.find().skip(skip).limit(limit);
    const totalItems = await Books.countDocuments();
    return { books, totalItems };
};

const getLivreById = async (id) => {
    return await Books.findById(id);
};

const createLivre = async (livreData) => {
    const livre = new Books(livreData);
    return await livre.save();
};

const deleteLivre = async (id) => {
    return await Books.findByIdAndDelete(id);
};

const getTotalPages = async (itemsPerPage) => {
    const totalLivres = await Books.countDocuments();    
    return Math.ceil(totalLivres / itemsPerPage);
};

const getBooksOrderByTitle = async(limit,skip,orderType) => {
    const books=await Books.find().sort({titre : orderType})
                                    .skip(skip)
                                    .limit(limit);
    const totalItems= await Books.countDocuments();
    return { books, totalItems };
}

const getBooksOrderByPage = async(limit,skip,orderType) => {
    const books=await Books.find().sort({pages : orderType})
                                    .skip(skip)
                                    .limit(limit);
    const totalItems= await Books.countDocuments();
    return { books, totalItems };
}

const getListOfReaderBooks = async(idBook, page=1, limit=5) => {
    try {
        console.log(idBook);
        const skip = (page - 1) * limit;
        const livre = await Books.aggregate([
            { $match: { _id: idBook } },      
            {
              $project: {
                _id: 0,
                titre: 1,
                lecteur: { $slice: ["$Lecteur", skip, limit] }
              }
            }
          ]);
        if (!livre || livre.length === 0) {
            throw new Error('Livre non trouvé');
        }
        return livre[0];
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des lecteurs : ${error.message}`);
    }
}

module.exports = {
    getBooks,
    getLivreById,
    createLivre,
    deleteLivre,
    getTotalPages,
    getListOfReaderBooks
};