# anchorManipulator
Adobe After Effects Anchor Manipulator via keyboard shortcuts. Move anchor and preserve position, move object around anchor. Respect to scale property.

### Usage

Use numpad and either Ctrl or Alt dependent to your task.

###### Ctrl — to shift anchor point:

![Ctrl usage](https://goopie.pro/images/lab/anchorManipulator/usageCtrl.png "Ctrl usage")

###### Alt — to shift object:

![Alt usage](https://goopie.pro/images/lab/anchorManipulator/usageAlt.png "Alt usage")

### Special cases

Sometimes we need anchor point in methemathical zero center (for example to correct rotation), not in center of visual rectangle.

###### Special shortcuts:

![Special case centering](https://goopie.pro/images/lab/anchorManipulator/centeringSpecialCase.png "Special case centering")

### Installation

#### Step 1. Install script file

Run `File / Scripts /  Install Script File` command and target script file _anchorManipulator.jsx_.

#### Step 2. Relaunch AE.

#### Step 3. Assign Shortcuts.

###### 3.1. Mark script file in list

Installed script placed in list `File / Scripts`. We should attach a bundle of keyboard shortcuts to a single file record. There are too many shortcuts, so it is impossible to fill all of them via AE keyboard assigner. We must make it manually. But we should know a position of our script in the list, so we make a "target" shortcut: 
* open "Keyboard Shortcuts" panel (`Ctrl+Alt+'`);
* find our script (either search or in File menu).
* set keyboard shortcut `Ctrl+Alt+Numpad5`.

![Place target shortcut](https://goopie.pro/images/lab/anchorManipulator/assignTargetShortcut.png "Place target shortcut")

###### 3.2. Place a rest of shortcuts in config file

Go to AE preferences and use "`Reveal Preferences in Explorer`" button.

Go to "_aeks_" folder and open settings file to edit:

![Reveal shortcuts settings file](https://goopie.pro/images/lab/anchorManipulator/revealShortcutSettings.png "Reveal shortcuts settings file")

Find our record with `ExecuteScriptMenuItem` text, replace shortcut command to text below:

![Find target row and replace shortcuts](https://goopie.pro/images/lab/anchorManipulator/findAndReplace.png "Find target row and replace shortcuts")

`"(Ctrl+Alt+PadMultiply)(Ctrl+PadMultiply)(Ctrl+Pad1)(Ctrl+Pad2)(C"\
"trl+Pad3)(Ctrl+Pad4)(Ctrl+Pad5)(Ctrl+Pad6)(Ctrl+Pad7)(Ctrl+Pad8)(Ctrl+Pad9)(Al"\
"t+Pad1)(Alt+Pad2)(Alt+Pad3)(Alt+Pad4)(Alt+Pad5)(Alt+Pad6)(Alt+Pad7)(Alt+Pad8)("\
"Alt+Pad9)(Ctrl+PadPageUp)(Ctrl+PadPageDown)(Ctrl+PadHome)(Ctrl+PadEnd)(Alt+Pad"\
"PageUp)(Alt+PadPageDown)(Alt+PadHome)(Alt+PadEnd)(Ctrl+Alt+PadClear)"`

Save settings file and restart AE.

Enjoy! =)

