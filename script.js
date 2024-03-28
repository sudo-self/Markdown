const codeEditor = document.getElementById('code-editor');
    const previewFrame = document.getElementById('preview-frame');
    const divider = document.getElementById('divider');
    const enterFullscreenButton = document.getElementById('enter-fullscreen');
    const exitFullscreenButton = document.getElementById('exit-fullscreen');
    let isDragging = false;

    codeEditor.addEventListener('input', updatePreview);

    function updatePreview() {
        const code = codeEditor.value;
        const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        previewDoc.open();
        previewDoc.write(code);
        previewDoc.close();
    }

   
    updatePreview();

   
    divider.addEventListener('mousedown', startDragging);

    function startDragging(e) {
        isDragging = true;
        document.addEventListener('mousemove', resizeEditor);
        document.addEventListener('mouseup', stopDragging);
    }

    function resizeEditor(e) {
        if (isDragging) {
            const editorWidth = e.clientX - document.getElementById('editor-container').getBoundingClientRect().left;
            document.getElementById('code-editor').style.width = `${editorWidth}px`;
        }
    }

    function stopDragging() {
        isDragging = false;
        document.removeEventListener('mousemove', resizeEditor);
        document.removeEventListener('mouseup', stopDragging);
    }

    // Fullscreen functionality
    enterFullscreenButton.addEventListener('click', enterFullscreen);
    exitFullscreenButton.addEventListener('click', exitFullscreen);

    function enterFullscreen() {
        const body = document.documentElement;
        if (body.requestFullscreen) {
            body.requestFullscreen();
        } else if (body.webkitRequestFullscreen) { /* Safari */
            body.webkitRequestFullscreen();
        } else if (body.msRequestFullscreen) { /* IE11 */
            body.msRequestFullscreen();
        }
    }

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }