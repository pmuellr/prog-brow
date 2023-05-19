#!/usr/bin/env bash

# https://gist.github.com/ahmed-musallam/0ba94853fcba39b01e4f5083daca7567#file-generate-icns-sh

# Required deps:
# imagemagick: https://imagemagick.org/script/download.php

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_DIR

BASE_NAME="prog-brow"
PNG_MASTER="$BASE_NAME.png"

ICONSET_FOLDER="$BASE_NAME.iconset"
sizes=(
  16x16
  32x32
  128x128
  256x256
  512x512
  1024x1024
)

# Generate renditions at the sizes in "sizes" above, put all in ICONSET_FOLDER
mkdir -p $ICONSET_FOLDER
for size in "${sizes[@]}"; do
  icon="icon_${size}.png"
  ICON_FILES="$ICON_FILES $ICONSET_FOLDER/$icon"
  echo Generating $ICONSET_FOLDER/$icon
  convert $PNG_MASTER -quality 100 -resize $size $ICONSET_FOLDER/$icon
  
  icon="icon_${size}@2x.png"
  ICON_FILES="$ICON_FILES $ICONSET_FOLDER/$icon"
  echo Generating $ICONSET_FOLDER/$icon
  convert $PNG_MASTER -quality 100 -resize $size $ICONSET_FOLDER/$icon
done

# generate icon.icns for mac app (this only works on mac)
echo Generating $BASE_NAME.icns
iconutil -c icns $ICONSET_FOLDER -o $BASE_NAME.icns

# Generate .ico file for windows
ICON_FILES=""
for size in "${sizes[@]}"; do
  ICON_FILES="$ICON_FILES $ICONSET_FOLDER/icon_${size}.png"
  ICON_FILES="$ICON_FILES $ICONSET_FOLDER/icon_${size}@2x.png"
done
echo Generating $BASE_NAME.ico
convert $ICON_FILES $BASE_NAME.ico 

# remove generated renditions
echo removing $ICONSET_FOLDER folder
rm -rf $ICONSET_FOLDER