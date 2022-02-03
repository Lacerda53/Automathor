FROM gradle:6.9-jdk11

USER root

WORKDIR /usr/app

COPY package*.json ./

RUN apt-get update && apt-get install -y git npm nodejs android-sdk

ENV NODE_VERSION 12.18

ENV ANDROID_HOME /usr/lib/android-sdk
ENV PATH ${PATH}:${ANDROID_HOME}/tools
ENV PATH ${PATH}:${ANDROID_HOME}/tools/bin
ENV PATH ${PATH}:${ANDROID_HOME}/platform-tools

# RUN mkdir -p ${ANDROID_HOME} && \
#     cd ${ANDROID_HOME} && \
#     wget -q https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip -O android_tools.zip && \
#     unzip android_tools.zip && \
#     rm android_tools.zip

RUN npm install -g n yarn

RUN n ${NODE_VERSION}

RUN yarn 

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]