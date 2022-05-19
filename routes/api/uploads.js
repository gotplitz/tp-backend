const express = require('express');
const router = express.Router();
const fs = require('fs');

const fileUpload = require('express-fileupload');
const path = require('path');

router.use(fileUpload());

// @route       POST api/uploads
// @description Upload files
// @access      Public
router.post('/', async (req, res) => {
    // All files upload info
    if (req.files === null) {
        return res.status(400).json({
            msg:
                'No file was uploaded because the file container is empty, <b>Please click browse first and choose the image you want as profile picture.</b>',
            type: 'warning',
        });
    }

    const file = req.files.newimg;
    var newpath = path.resolve(
        __dirname,
        '../../uploads',
        `${file.name
            .replace(/&/g, 'and')
            .replace(/-/g, ' ')
            .replace(/[^a-zA-Z0-9. ]/g, '')
            .replace(/ /g, '-')
            .toLowerCase()}`
    );

    const splitname = file.name
        .replace(/&/g, 'and')
        .replace(/-/g, ' ')
        .replace(/[^a-zA-Z0-9. ]/g, '')
        .replace(/ /g, '-')
        .toLowerCase()
        .split('.');
    let number = 0;
    let fileExist = true;

    if (fs.existsSync(newpath)) {
        while (fs.existsSync(newpath)) {
            var newname = splitname[0] + '-' + number++ + '.' + splitname[1];
            var newpath = path.resolve(
                __dirname,
                '../../uploads',
                `${newname
                    .replace(/&/g, 'and')
                    .replace(/-/g, ' ')
                    .replace(/[^a-zA-Z0-9. ]/g, '')
                    .replace(/ /g, '-')
                    .toLowerCase()}`
            );
            number++;
            if (!fs.existsSync(newpath)) {
                fileExist = false;
                break;
            }
        }
    } else {
        fileExist = false;
    }

    if (!fileExist) {
        const finalname = splitname[0] + '-' + number + '.' + splitname[1];
        file.mv(`uploads/${finalname}`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.json({
                newimage: finalname,
                filePath: `uploads/${finalname}`,
                msg: 'Upload completed',
            });
        });
    }
});

// @route       POST api/uploads
// @description Upload Multiple files
// @access      Public
router.post('/multiple', async (req, res) => {
    // All files upload info
    if (req.files === null) {
        return res.status(400).json({
            msg:
                'No file was uploaded because the file container is empty, <b>Please click browse first and choose the image you want as profile picture.</b>',
            type: 'warning',
        });
    }

    const files =
        req.files.gallery.length > 0 ? req.files.gallery : [req.files.gallery];

    const final = [];

    for (var i = 0; i < files.length; i++) {
        let number = 0;
        let fileExist = true;
        var newpath = path.resolve(
            __dirname,
            '../../uploads',
            `${files[i].name
                .replace(/&/g, 'and')
                .replace(/-/g, ' ')
                .replace(/[^a-zA-Z0-9. ]/g, '')
                .replace(/ /g, '-')
                .toLowerCase()}`
        );
        const splitname = files[i].name
            .replace(/&/g, 'and')
            .replace(/-/g, ' ')
            .replace(/[^a-zA-Z0-9. ]/g, '')
            .replace(/ /g, '-')
            .toLowerCase()
            .split('.');

        if (fs.existsSync(newpath)) {
            while (fs.existsSync(newpath)) {
                var newname = splitname[0] + '-' + number + '.' + splitname[1];

                newpath = path.resolve(
                    __dirname,
                    '../../uploads',
                    `${newname
                        .replace(/&/g, 'and')
                        .replace(/-/g, ' ')
                        .replace(/[^a-zA-Z0-9. ]/g, '')
                        .replace(/ /g, '-')
                        .toLowerCase()}`
                );

                number++;

                if (!fs.existsSync(newpath)) {
                    final.push(newname);
                    files[i].mv(`uploads/${newname}`, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                        }
                    });
                    break;
                }
            }
        } else {
            fileExist = false;
        }

        if (!fileExist) {
            const finalname = splitname[0] + '-' + number + '.' + splitname[1];
            final.push(finalname);
            files[i].mv(`uploads/${finalname}`, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
            });
        }
    }

    // final.forEach((fl) => {
    //     fl.mv(`uploads/${fl}`, (err) => {
    //         if (err) {
    //             console.error(err);
    //             return res.status(500).send(err);
    //         }
    //     });
    // });

    res.json(final);
});

module.exports = router;
